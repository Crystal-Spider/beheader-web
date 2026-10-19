import {defaultTreeAdapter, parse} from 'parse5';

import {CompositionOptions, HtmlReference, InputSource, ProcessingContext} from '../model/contract';
import {CHUNK_BYTES, INPUT_LIMIT} from '../io/bytes';
import {BinaryReader, invalid} from '../io/binary';
import {OutputWriter} from '../io/output-writer';
import {ArchiveInfo} from './archive';
import {checkCancelled} from '../logic/diagnostic';
import {HTML_TEXT_LIMIT} from './html';
import {HtmlAssets} from './html-assets';
import {HtmlPart, htmlMarkup, htmlNodes, partSize, writeHtml} from './html-output';

/** Runtime-only serialization recipe; file bytes and syntax trees never enter NgRx. */
export interface HtmlBundle {
  readonly size: number;
  readonly references: readonly HtmlReference[];
  write(output: OutputWriter, context: ProcessingContext): Promise<void>;
}

/**
 * Reads bounded UTF-8 parser text; large resources are handled separately as streams.
 * @param {InputSource} source HTML file at the ZIP root.
 * @param {ProcessingContext} context Cancellation.
 * @returns {Promise<string>} At most 64 MiB of parsed HTML input.
 */
async function htmlText(source: InputSource, context: ProcessingContext): Promise<string> {
  if (source.reader.size > HTML_TEXT_LIMIT) { invalid('FORMAT_RESOURCE_LIMIT', {reason: 'HTML_TEXT_BYTES', actual: source.reader.size, limit: HTML_TEXT_LIMIT}); }
  const decoder = new TextDecoder('utf-8', {fatal: true});
  const parts: string[] = [];
  const reader = new BinaryReader(source.reader, context.signal);
  for (let offset = 0; offset < source.reader.size; offset += CHUNK_BYTES) {
    parts.push(decoder.decode(await reader.read(offset, Math.min(CHUNK_BYTES, source.reader.size - offset)), {stream: true}));
  }
  parts.push(decoder.decode());
  return parts.join('');
}

/**
 * Plans static resource inlining without allocating complete data URLs or fetching/executing content.
 * @param {InputSource} source Separately uploaded HTML, resolved from the ZIP root.
 * @param {ArchiveInfo | undefined} assets Optional user-supplied resources.
 * @param {CompositionOptions} _options Explicit unresolved-reference policy belongs to the planner.
 * @param {ProcessingContext} context Cancellation and measured work.
 * @returns {Promise<HtmlBundle>} Size-checked recipe that writes directly into the generated file.
 */
export async function bundleHtml(source: InputSource, assets: ArchiveInfo | undefined, _options: CompositionOptions, context: ProcessingContext): Promise<HtmlBundle> {
  checkCancelled(context.signal);
  if (source.reader.size + (assets?.expandedSize ?? 0) > INPUT_LIMIT) { invalid('FORMAT_RESOURCE_LIMIT', {reason: 'HTML_LOGICAL_BYTES', actual: source.reader.size + (assets?.expandedSize ?? 0), limit: INPUT_LIMIT}); }
  const resources = new HtmlAssets(assets, context);
  let created = 0;
  const reserve = (): void => {
    checkCancelled(context.signal);
    if (++created > 1000000) { invalid('FORMAT_RESOURCE_LIMIT', {reason: 'HTML_NODES', actual: created, limit: 1000000}); }
  };
  const document = parse(await htmlText(source, context), {treeAdapter: {
    ...defaultTreeAdapter,
    createElement: (...args) => { reserve(); return defaultTreeAdapter.createElement(...args); },
    createCommentNode: (...args) => { reserve(); return defaultTreeAdapter.createCommentNode(...args); },
    createDocumentFragment: () => { reserve(); return defaultTreeAdapter.createDocumentFragment(); },
    insertText: (parent, text) => {
      const last = parent.childNodes.at(-1);
      if (!last || !defaultTreeAdapter.isTextNode(last)) { reserve(); }
      defaultTreeAdapter.insertText(parent, text);
    },
    insertTextBefore: (parent, text, reference) => {
      const previous = parent.childNodes[parent.childNodes.indexOf(reference) - 1];
      if (!previous || !defaultTreeAdapter.isTextNode(previous)) { reserve(); }
      defaultTreeAdapter.insertTextBefore(parent, text, reference);
    },
    setDocumentType: (...args) => {
      if (!args[0].childNodes.some(node => node.nodeName === '#documentType')) { reserve(); }
      defaultTreeAdapter.setDocumentType(...args);
    }
  }});
  let base = 'index.html';
  // Preserve an explicit HTML <base>, but provide no application-level path override.
  for (const node of htmlNodes(document, false)) {
    if ('tagName' in node && node.tagName === 'base') {
      const href = node.attrs.find(attr => attr.name === 'href');
      if (href) { base = new URL(href.value, 'https://bhw.invalid/').href; break; }
    }
  }
  for (const node of htmlNodes(document)) {
    checkCancelled(context.signal);
    if (!('tagName' in node)) { continue; }
    const attr = (name: string): string | undefined => node.attrs.find(attr => attr.name === name)?.value;
    for (const attribute of node.attrs) {
      if (attribute.name === 'style') { attribute.value = await resources.css(attribute.value, base, 'declarationList'); }
      else if (['srcset', 'imagesrcset'].includes(attribute.name)) {
        const candidates: string[] = [];
        let remaining = attribute.value;
        while (remaining.trim()) {
          const match = /^\s*,*\s*(\S+)(?:\s+([^,]*))?(?:,|$)/.exec(remaining);
          if (!match) { resources.unresolved(attribute.value, base, 'unsupported'); break; }
          const url = match[1]!;
          const trailing = url.endsWith(',');
          const value = trailing ? url.replace(/,+$/, '') : url;
          const descriptor = trailing ? '' : (match[2] ?? '').trim();
          if (descriptor && !/^(?:\d+w|(?:\d*\.)?\d+x)$/.test(descriptor)) { resources.unresolved(attribute.value, base, 'unsupported'); break; }
          candidates.push(`${await resources.resolve(value, base)}${descriptor ? ' ' + descriptor : ''}`);
          remaining = remaining.slice(trailing ? match[0].indexOf(url) + url.length : match[0].length);
        }
        if (!remaining.trim()) { attribute.value = candidates.join(', '); }
      } else if (node.tagName === 'iframe' && attribute.name === 'src') { resources.unresolved(attribute.value, base, 'unsupported'); }
      else if (node.tagName === 'script' && attribute.name === 'src') {
        attribute.value = attr('type')?.toLowerCase() === 'module' ? resources.unresolved(attribute.value, base, 'unsupported') : await resources.resolve(attribute.value, base, 'text/javascript');
      } else if (node.tagName === 'link' && attribute.name === 'href' && /(?:^|\s)stylesheet(?:\s|$)/i.test(attr('rel') ?? '')) {
        attribute.value = await resources.resolve(attribute.value, base, 'text/css');
      } else if (['src', 'poster', 'background'].includes(attribute.name) || node.tagName === 'link' && attribute.name === 'href' && /(?:icon|preload)/i.test(attr('rel') ?? '')) {
        attribute.value = await resources.resolve(attribute.value, base);
      }
    }
    if (node.tagName === 'style') {
      for (const child of node.childNodes) { if ('value' in child && child.nodeName === '#text') { child.value = await resources.css(child.value, base); } }
    }
    if (node.tagName === 'meta' && attr('http-equiv')?.toLowerCase() === 'content-security-policy') { resources.unresolved('content-security-policy', base, 'unsupported'); }
    if (node.tagName === 'script' && attr('type')?.toLowerCase() === 'module' && !attr('src')) { resources.unresolved('inline-module', base, 'unsupported'); }
  }
  const parts = (): Generator<HtmlPart> => resources.markup(htmlMarkup(document));
  let size = 0;
  for (const part of parts()) {
    checkCancelled(context.signal);
    size += partSize(part);
    if (size > INPUT_LIMIT) { invalid('FORMAT_RESOURCE_LIMIT', {reason: 'HTML_OUTPUT_BYTES', actual: size, limit: INPUT_LIMIT}); }
  }
  return {size, references: resources.references, write: (output, next) => writeHtml(parts(), size, output, next)};
}
