import {DefaultTreeAdapterTypes, parse, serialize} from 'parse5';
import {CssNode, generate, parse as parseCss, walk} from 'css-tree';

import {CompositionOptions, HtmlReference, InputSource, ProcessingContext} from '../model/contract';
import {CHUNK_BYTES} from '../io/bytes';
import {BinaryReader, invalid} from '../io/binary';
import {ArchiveInfo, archivePath} from './archive';
import {checkCancelled, diagnose, ProcessingError} from '../logic/diagnostic';

/** Parser and inline-data allocations are deliberately bounded independently of file size limits. */
const TEXT_LIMIT = 8 * CHUNK_BYTES;
const BUNDLE_LIMIT = 64 * CHUNK_BYTES;

/**
 * Reads bounded UTF-8 text, refusing unsupported encodings rather than silently replacing characters.
 * @param {InputSource} source Local HTML file.
 * @param {ProcessingContext} context Cancellation.
 * @returns {Promise<string>} Bounded parser input.
 */
async function htmlText(source: InputSource, context: ProcessingContext): Promise<string> {
  if (source.reader.size > TEXT_LIMIT) { invalid('FORMAT_RESOURCE_LIMIT'); }
  const decoder = new TextDecoder('utf-8', {fatal: true});
  let text = '';
  const reader = new BinaryReader(source.reader, context.signal);
  for (let offset = 0; offset < source.reader.size; offset += CHUNK_BYTES) {
    text += decoder.decode(await reader.read(offset, Math.min(CHUNK_BYTES, source.reader.size - offset)), {stream: true});
  }
  return text + decoder.decode();
}

/**
 * Encodes bounded assets without spreading a complete byte array onto the JavaScript stack.
 * @param {Uint8Array} bytes Asset bytes.
 * @param {string} type MIME interpretation.
 * @returns {string} Standalone data URL.
 */
function dataUrl(bytes: Uint8Array, type: string): string {
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 16384) { binary += String.fromCharCode(...bytes.subarray(offset, offset + 16384)); }
  return `data:${type};base64,${btoa(binary)}`;
}

/**
 * Bundles supplied static resources using syntax trees; never fetches or executes supplied content.
 * @param {InputSource} source HTML entry.
 * @param {ArchiveInfo | undefined} assets Optional inspected asset ZIP.
 * @param {CompositionOptions} options Entry path and unresolved-reference decision.
 * @param {ProcessingContext} context Cancellation during reads and traversal.
 * @returns {Promise<{blob: Blob; references: HtmlReference[]}>} Standalone document and display-only unresolved details.
 */
export async function bundleHtml(source: InputSource, assets: ArchiveInfo | undefined, options: CompositionOptions, context: ProcessingContext): Promise<{blob: Blob; references: HtmlReference[]}> {
  const path = archivePath(options.htmlPath ?? source.name);
  const origin = 'https://bhw.invalid/';
  const references: HtmlReference[] = [];
  const entries = new Map(assets?.entries.filter(entry => !entry.directory).map(entry => [archivePath(entry.filename), entry]));
  let expanded = 0;
  let emitted = 0;
  let operations = 0;
  const unresolved = (reference: string, from: string, reason: HtmlReference['reason']): string => {
    if (references.length >= 4096) { invalid('FORMAT_RESOURCE_LIMIT'); }
    references.push({reference, from, reason});
    return reference;
  };
  const load = async(reference: string, from: string, type?: string, chain: readonly string[] = []): Promise<string> => {
    checkCancelled(context.signal);
    if (++operations > 4096 || chain.length > 32) { invalid('FORMAT_RESOURCE_LIMIT'); }
    if (!reference || reference.startsWith('#') || /^data:/i.test(reference)) { return reference; }
    let url: URL;
    try { url = new URL(reference, new URL(from, origin)); }
    catch { return unresolved(reference, from, 'unsupported'); }
    if (url.origin !== new URL(origin).origin) { return unresolved(reference, from, 'remote'); }
    let key: string;
    try { key = decodeURIComponent(url.pathname.slice(1)); }
    catch { return unresolved(reference, from, 'unsupported'); }
    if (chain.includes(key)) { return unresolved(reference, from, 'cycle'); }
    const entry = entries.get(key);
    if (!entry) { return unresolved(reference, from, 'missing'); }
    if (entry.uncompressedSize > TEXT_LIMIT || expanded + entry.uncompressedSize > 32 * CHUNK_BYTES) { invalid('FORMAT_RESOURCE_LIMIT'); }
    const chunks: Uint8Array<ArrayBuffer>[] = [];
    let actual = 0;
    let failure: unknown;
    try {
      await entry.getData(new WritableStream<Uint8Array<ArrayBuffer>>({write: bytes => {
        try {
          checkCancelled(context.signal);
          actual += bytes.length;
          expanded += bytes.length;
          if (actual > entry.uncompressedSize || expanded > 32 * CHUNK_BYTES) { invalid('ARCHIVE_EXPANDED_LIMIT'); }
          chunks.push(bytes.slice());
        } catch(error) { failure = error; throw error; }
      }}), {signal: context.signal, checkCrc32: true, checkLocalDirectory: true, checkLocalFilename: true, checkOverlappingEntry: true, useWebWorkers: false});
    } catch(error) { throw new ProcessingError(diagnose(failure ?? error, 'HTML_ASSET_INVALID')); }
    if (actual !== entry.uncompressedSize) { invalid('ARCHIVE_INVALID'); }
    const bytes = new Uint8Array(await new Blob(chunks).arrayBuffer());
    const extension = key.split('.').at(-1)?.toLowerCase() ?? '';
    const mime: Record<string, string> = {png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml', ico: 'image/x-icon', woff: 'font/woff', woff2: 'font/woff2', ttf: 'font/ttf', otf: 'font/otf', css: 'text/css', js: 'text/javascript'};
    const text = type === 'text/css' ? await css(new TextDecoder('utf-8', {fatal: true}).decode(bytes), key, [...chain, key]) : undefined;
    const result = dataUrl(text === undefined ? bytes : new TextEncoder().encode(text), type ?? mime[extension] ?? 'application/octet-stream') + url.hash;
    emitted += result.length;
    if (emitted > BUNDLE_LIMIT) { invalid('FORMAT_RESOURCE_LIMIT'); }
    return result;
  };
  const css = async(text: string, from: string, chain: readonly string[], contextName: 'stylesheet' | 'declarationList' = 'stylesheet'): Promise<string> => {
    const tree = parseCss(text, {context: contextName, parseCustomProperty: true, onParseError: () => { invalid('HTML_ASSET_INVALID'); }});
    const urls: {node: CssNode; type?: string}[] = [];
    walk(tree, {enter(node: CssNode) {
      if (node.type === 'Raw') { unresolved(generate(node), from, 'unsupported'); }
      if (node.type === 'Url') { urls.push({node}); }
      if (node.type === 'Atrule' && node.name.toLowerCase() === 'import' && node.prelude?.type === 'AtrulePrelude') {
        const first = node.prelude.children.first;
        if (first?.type === 'String' || first?.type === 'Url') { urls.push({node: first, type: 'text/css'}); }
      }
    }});
    const imports = new Set(urls.filter(item => item.type).map(item => item.node));
    for (const {node, type} of urls) {
      if (node.type === 'String' || node.type === 'Url') {
        if (!type && imports.has(node)) { continue; }
        node.value = await load(node.value, from, type, chain);
      }
    }
    return generate(tree).replaceAll('<', '\\3c ');
  };
  const document = parse(await htmlText(source, context));
  const nodes: DefaultTreeAdapterTypes.Node[] = [...document.childNodes];
  let visited = 0;
  let base = path;
  // HTML's first base href applies to every reference, including preceding nodes.
  const pending = [...nodes];
  while (pending.length) {
    const node = pending.shift()!;
    if (++visited > 100000) { invalid('FORMAT_RESOURCE_LIMIT'); }
    if ('tagName' in node && node.tagName === 'base') {
      const href = node.attrs.find(attr => attr.name === 'href');
      if (href) { base = new URL(href.value, new URL(path, origin)).href; break; }
    }
    if ('childNodes' in node) { pending.push(...node.childNodes); }
  }
  visited = 0;
  while (nodes.length) {
    checkCancelled(context.signal);
    const node = nodes.pop()!;
    if (++visited > 100000) { invalid('FORMAT_RESOURCE_LIMIT'); }
    if ('childNodes' in node) { nodes.push(...node.childNodes); }
    if ('tagName' in node) {
      if ('content' in node) { nodes.push(...node.content.childNodes); }
      const attr = (name: string): string | undefined => node.attrs.find(attr => attr.name === name)?.value;
      for (const attribute of node.attrs) {
        if (attribute.name === 'style') { attribute.value = await css(attribute.value, base, [], 'declarationList'); }
        else if (['srcset', 'imagesrcset'].includes(attribute.name)) {
          const candidates: string[] = [];
          let remaining = attribute.value;
          while (remaining.trim()) {
            const match = /^\s*,*\s*(\S+)(?:\s+([^,]*))?(?:,|$)/.exec(remaining);
            if (!match) { unresolved(attribute.value, base, 'unsupported'); break; }
            const url = match[1]!;
            const trailing = url.endsWith(',');
            const value = trailing ? url.replace(/,+$/, '') : url;
            const descriptor = trailing ? '' : (match[2] ?? '').trim();
            if (descriptor && !/^(?:\d+w|(?:\d*\.)?\d+x)$/.test(descriptor)) { unresolved(attribute.value, base, 'unsupported'); break; }
            candidates.push(`${await load(value, base)}${descriptor ? ' ' + descriptor : ''}`);
            remaining = remaining.slice(trailing ? match[0].indexOf(url) + url.length : match[0].length);
          }
          if (!remaining.trim()) { attribute.value = candidates.join(', '); }
        } else if (node.tagName === 'iframe' && attribute.name === 'src') { unresolved(attribute.value, base, 'unsupported'); }
        else if (node.tagName === 'script' && attribute.name === 'src') {
          attribute.value = attr('type')?.toLowerCase() === 'module' ? unresolved(attribute.value, base, 'unsupported') : await load(attribute.value, base, 'text/javascript');
        } else if (node.tagName === 'link' && attribute.name === 'href' && /(?:^|\s)stylesheet(?:\s|$)/i.test(attr('rel') ?? '')) {
          attribute.value = await load(attribute.value, base, 'text/css');
        } else if (['src', 'poster', 'background'].includes(attribute.name) || node.tagName === 'link' && attribute.name === 'href' && /(?:icon|preload)/i.test(attr('rel') ?? '')) {
          attribute.value = await load(attribute.value, base);
        }
      }
      if (node.tagName === 'style') {
        for (const child of node.childNodes) { if ('value' in child && child.nodeName === '#text') { child.value = await css(child.value, base, []); } }
      }
      if (node.tagName === 'meta' && attr('http-equiv')?.toLowerCase() === 'content-security-policy') { unresolved('content-security-policy', base, 'unsupported'); }
      if (node.tagName === 'script' && attr('type')?.toLowerCase() === 'module' && !attr('src')) { unresolved('inline-module', base, 'unsupported'); }
    }
  }
  const text = serialize(document);
  const blob = new Blob([text], {type: 'text/html'});
  if (blob.size > BUNDLE_LIMIT) { invalid('FORMAT_RESOURCE_LIMIT'); }
  return {blob, references};
}
