import {Entry} from '@zip.js/zip.js';
import {CssNode} from 'css-tree';
import {generate, parse as parseCss, walk} from 'css-tree/dist/csstree.esm';

import {HtmlReference, ProcessingContext} from '../model/contract';
import {CHUNK_BYTES} from '../io/bytes';
import {invalid} from '../io/binary';
import {checkCancelled, ProcessingError} from '../logic/diagnostic';
import {ArchiveInfo, archivePath, archiveDiagnostic} from './archive';
import {HTML_TEXT_LIMIT} from './html';
import {encodedPart, HtmlPart} from './html-output';

/** CSS reference binding, retaining import-vs-ordinary URL semantics. */
interface CssLink {readonly node: CssNode & {value: string}; readonly type?: string}
/** Explicit import traversal frame; input depth never consumes the JavaScript call stack. */
interface CssFrame {readonly key: string; readonly hash: string; readonly tree: CssNode; readonly links: readonly CssLink[]; next: number; readonly target?: CssLink}

/** Maximum reference work, including repeated, missing and remote references. */
export const HTML_REFERENCE_LIMIT = 65536;

/** Parser-backed local resource graph with lazy data URLs and explicit cycle detection. */
export class HtmlAssets {
  /** @type {HtmlReference[]} */
  public readonly references: HtmlReference[] = [];
  /** @type {Map<string, Entry>} */
  private readonly entries: Map<string, Entry>;
  /** @type {Map<string, readonly HtmlPart[]>} */
  private readonly tokens = new Map<string, readonly HtmlPart[]>();
  /** @type {Map<string, string>} */
  private readonly cache = new Map<string, string>();
  /** @type {Set<string>} */
  private readonly active = new Set<string>();
  /** @type {string} */
  private readonly prefix = `bhw-${crypto.randomUUID()}-`;
  /** @type {number} */
  private operations = 0;

  /**
   * @param {ArchiveInfo | undefined} assets Optional local resources.
   * @param {ProcessingContext} context Cancellation during reads and traversal.
   */
  public constructor(assets: ArchiveInfo | undefined, private readonly context: ProcessingContext) {
    this.entries = new Map(assets?.entries.filter(entry => !entry.directory).map(entry => [archivePath(entry.filename), entry]));
  }

  /**
   * @param {string} reference Original reference, never fetched.
   * @param {string} from Relative owning document or stylesheet.
   * @param {HtmlReference['reason']} reason User-resolvable limitation.
   * @returns {string} Original value retained for explicit continuation.
   */
  public unresolved(reference: string, from: string, reason: HtmlReference['reason']): string {
    if (this.references.length >= HTML_REFERENCE_LIMIT) { invalid('FORMAT_RESOURCE_LIMIT', {reason: 'HTML_REFERENCES', actual: this.references.length + 1, limit: HTML_REFERENCE_LIMIT}); }
    this.references.push({reference, from, reason});
    return reference;
  }

  /**
   * Replaces unguessable placeholders with reusable recipe nodes, never giant strings.
   * @param {string} text Parsed serializer output containing optional placeholders.
   * @returns {Generator<HtmlPart>} Literal and lazy resource fragments.
   */
  public* parts(text: string): Generator<HtmlPart> {
    const pattern = new RegExp(`${this.prefix}\\d+-end`, 'g');
    let position = 0;
    for (let match = pattern.exec(text); match; match = pattern.exec(text)) {
      if (match.index > position) { yield text.slice(position, match.index); }
      const parts = this.tokens.get(match[0]);
      if (!parts) { invalid('HTML_ASSET_INVALID', {reason: 'ASSET_RECIPE'}); }
      yield* parts;
      position = match.index + match[0].length;
    }
    if (position < text.length) { yield text.slice(position); }
  }

  /**
   * Preserves placeholders split by the bounded markup serializer.
   * @param {Iterable<string>} fragments Escaped markup fragments.
   * @returns {Generator<HtmlPart>} Resource-aware output without a full HTML string.
   */
  public* markup(fragments: Iterable<string>): Generator<HtmlPart> {
    const reserve = this.prefix.length + 16;
    let pending = '';
    for (const fragment of fragments) {
      pending += fragment;
      let end = Math.max(0, pending.length - reserve);
      const token = pending.lastIndexOf(this.prefix, end);
      if (token >= 0 && token + reserve > end) { end = token; }
      const last = pending.charCodeAt(end - 1);
      if (end < pending.length && last >= 0xd800 && last <= 0xdbff) { end--; }
      yield* this.parts(pending.slice(0, end));
      pending = pending.slice(end);
    }
    yield* this.parts(pending);
  }

  /**
   * Resolves CSS imports iteratively, preserving relative stylesheet paths and cycles.
   * @param {string} reference Input URL.
   * @param {string} from Owning HTML or stylesheet.
   * @param {string | undefined} type Explicit CSS/script interpretation when relevant.
   * @returns {Promise<string>} Safe placeholder or unchanged unresolved reference.
   */
  public async resolve(reference: string, from: string, type?: string): Promise<string> {
    const initial = await this.start(reference, from, type);
    if (typeof initial === 'string') { return initial; }
    const stack = [initial];
    while (stack.length) {
      checkCancelled(this.context.signal);
      const frame = stack[stack.length - 1]!;
      const link = frame.links[frame.next++];
      if (link) {
        const next = await this.start(link.node.value, frame.key, link.type);
        if (typeof next === 'string') { link.node.value = next; }
        else { stack.push({...next, target: link}); }
      } else {
        const token = this.token([...this.parts(generate(frame.tree).replaceAll('<', '\\3c '))], 'text/css');
        this.cache.set(`text/css:${frame.key}`, token);
        this.active.delete(frame.key);
        stack.pop();
        if (frame.target) { frame.target.node.value = token + frame.hash; }
        else { return token + frame.hash; }
      }
    }
    invalid('HTML_ASSET_INVALID');
  }

  /**
   * @param {string} text Bounded inline CSS.
   * @param {string} from HTML-relative base.
   * @param {'stylesheet' | 'declarationList'} context CSS syntax context.
   * @returns {Promise<string>} Rewritten CSS with safe lazy placeholders.
   */
  public async css(text: string, from: string, context: 'stylesheet' | 'declarationList' = 'stylesheet'): Promise<string> {
    const {tree, links} = this.parse(text, from, context);
    for (const link of links) { link.node.value = await this.resolve(link.node.value, from, link.type); }
    return generate(tree).replaceAll('<', '\\3c ');
  }

  /**
   * @param {readonly HtmlPart[]} parts Unencoded resource content.
   * @param {string} type Fixed MIME type.
   * @returns {string} Small random placeholder for a bounded lazy data URL.
   */
  private token(parts: readonly HtmlPart[], type: string): string {
    const token = `${this.prefix}${this.tokens.size}-end`;
    this.tokens.set(token, [`data:${type};base64,`, encodedPart(parts)]);
    return token;
  }

  /**
   * @param {string} reference Original URL.
   * @param {string} from Owning path.
   * @param {string | undefined} type Explicit resource type.
   * @returns {Promise<string | CssFrame>} Immediate result or a new CSS traversal frame.
   */
  private async start(reference: string, from: string, type?: string): Promise<string | CssFrame> {
    checkCancelled(this.context.signal);
    if (++this.operations > HTML_REFERENCE_LIMIT) { invalid('FORMAT_RESOURCE_LIMIT', {reason: 'HTML_REFERENCES', actual: this.operations, limit: HTML_REFERENCE_LIMIT}); }
    if (!reference || reference.startsWith('#') || /^data:/i.test(reference)) { return reference; }
    const origin = 'https://bhw.invalid/';
    let url: URL;
    try { url = new URL(reference, new URL(from, origin)); }
    catch { return this.unresolved(reference, from, 'unsupported'); }
    if (url.origin !== new URL(origin).origin) { return this.unresolved(reference, from, 'remote'); }
    let key: string;
    try { key = decodeURIComponent(url.pathname.slice(1)); }
    catch { return this.unresolved(reference, from, 'unsupported'); }
    if (this.active.has(key)) { return this.unresolved(reference, from, 'cycle'); }
    const entry = this.entries.get(key);
    if (!entry) { return this.unresolved(reference, from, 'missing'); }
    const cacheKey = `${type ?? ''}:${key}`;
    const cached = this.cache.get(cacheKey);
    if (cached) { return cached + url.hash; }
    if (type === 'text/css') {
      const parsed = this.parse(await this.readCss(entry), key, 'stylesheet');
      this.active.add(key);
      return {key, hash: url.hash, ...parsed, next: 0};
    }
    const extension = key.split('.').at(-1)?.toLowerCase() ?? '';
    const mime: Record<string, string> = {png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml', ico: 'image/x-icon', woff: 'font/woff', woff2: 'font/woff2', ttf: 'font/ttf', otf: 'font/otf', css: 'text/css', js: 'text/javascript'};
    const token = this.token([{kind: 'asset', entry, size: entry.uncompressedSize}], type ?? mime[extension] ?? 'application/octet-stream');
    this.cache.set(cacheKey, token);
    return token + url.hash;
  }

  /**
   * @param {string} text CSS inside the parsed-text limit.
   * @param {string} from Owning path for diagnostics.
   * @param {'stylesheet' | 'declarationList'} context Parser context.
   * @returns {{tree: CssNode; links: readonly CssLink[]}} Syntax tree and deduplicated bindings.
   */
  private parse(text: string, from: string, context: 'stylesheet' | 'declarationList'): {tree: CssNode; links: readonly CssLink[]} {
    const tree = parseCss(text, {context, parseCustomProperty: true, onParseError: () => { invalid('HTML_ASSET_INVALID', {reason: 'CSS_SYNTAX'}); }});
    const links = new Map<CssNode, CssLink>();
    walk(tree, {enter: (node: CssNode) => {
      if (node.type === 'Raw') { this.unresolved(generate(node), from, 'unsupported'); }
      if (node.type === 'Url' && !links.has(node)) { links.set(node, {node}); }
      if (node.type === 'Atrule' && node.name.toLowerCase() === 'import' && node.prelude?.type === 'AtrulePrelude') {
        const first = node.prelude.children.first;
        if (first?.type === 'String' || first?.type === 'Url') { links.set(first, {node: first, type: 'text/css'}); }
      }
    }});
    return {tree, links: [...links.values()]};
  }

  /**
   * @param {Entry} entry Preflighted CSS entry.
   * @returns {Promise<string>} CRC-checked UTF-8 text, at most 64 MiB.
   */
  private async readCss(entry: Entry): Promise<string> {
    if (entry.directory) { invalid('HTML_ASSET_INVALID', {reason: 'ASSET_DIRECTORY'}); }
    if (entry.uncompressedSize > HTML_TEXT_LIMIT) { invalid('FORMAT_RESOURCE_LIMIT', {reason: 'HTML_TEXT_BYTES', actual: entry.uncompressedSize, limit: HTML_TEXT_LIMIT}); }
    const decoder = new TextDecoder('utf-8', {fatal: true});
    const decode = (bytes?: Uint8Array<ArrayBuffer>, stream = false): string => {
      try { return decoder.decode(bytes, {stream}); }
      catch { return invalid('HTML_ASSET_INVALID', {reason: 'ASSET_ENCODING'}); }
    };
    const parts: string[] = [];
    let actual = 0;
    let failure: unknown;
    try {
      await entry.getData(new WritableStream<Uint8Array<ArrayBuffer>>({write: bytes => {
        try {
          checkCancelled(this.context.signal);
          actual += bytes.length;
          if (actual > entry.uncompressedSize || actual > HTML_TEXT_LIMIT) { invalid('ARCHIVE_EXPANDED_LIMIT', {reason: 'ZIP_ENTRY_SIZE', actual, limit: Math.min(entry.uncompressedSize, HTML_TEXT_LIMIT)}); }
          for (let offset = 0; offset < bytes.length; offset += CHUNK_BYTES) { parts.push(decode(bytes.subarray(offset, offset + CHUNK_BYTES), true)); }
        } catch(error) { failure = error; throw error; }
      }}), {signal: this.context.signal, checkCrc32: true, checkLocalDirectory: true, checkLocalFilename: true, checkOverlappingEntry: true, useWebWorkers: false});
      parts.push(decode());
    } catch(error) { throw new ProcessingError(archiveDiagnostic(failure ?? error, 'HTML_ASSET_INVALID')); }
    if (actual !== entry.uncompressedSize) { invalid('ARCHIVE_INVALID', {reason: 'ZIP_ENTRY_SIZE', actual, limit: entry.uncompressedSize}); }
    return parts.join('');
  }
}
