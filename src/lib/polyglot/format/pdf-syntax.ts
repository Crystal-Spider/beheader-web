/* eslint no-control-regex: off -- NUL is explicitly a PDF whitespace character. */
import {ProcessingError} from '../logic/diagnostic';

/** Bounded trailer token; raw offsets preserve byte positions without interpreting document strings. */
interface Token {readonly value: string; readonly start: number; readonly end: number; readonly kind: 'name' | 'word' | 'string' | 'delimiter'}

/** PDF whitespace includes NUL and form feed; percent comments end at either line separator. */
const SPACE = /[\x00\t\n\f\r ]/;
const DELIMITER = /[\x00\t\n\f\r ()<>[\]{}/%]/;

/** Small lexical reader for trailer dictionaries, including comments and adjacent delimiters. */
export class PdfSyntax {
  /** @type {number} */
  public position = 0;
  /** @param {string} text Prebounded metadata, never stream payloads. */
  public constructor(private readonly text: string) {}

  /** @returns {Token | undefined} Next token without retaining decoded string contents. */
  public next(): Token | undefined {
    while (this.position < this.text.length) {
      if (SPACE.test(this.text[this.position]!)) { this.position++; }
      else if (this.text[this.position] === '%') { while (this.position < this.text.length && !/[\r\n]/.test(this.text[this.position]!)) { this.position++; } }
      else { break; }
    }
    const start = this.position;
    const first = this.text[this.position++];
    if (first === undefined) { this.position = start; return undefined; }
    if (first === '(') {
      let depth = 1;
      while (this.position < this.text.length && depth) {
        const character = this.text[this.position++];
        if (character === '\\') { this.position++; }
        else if (character === '(') { depth++; }
        else if (character === ')') { depth--; }
      }
      if (depth) { this.fail(); }
      return {kind: 'string', value: '', start, end: this.position};
    }
    if (first === '<' && this.text[this.position] !== '<') {
      while (this.position < this.text.length && /[\da-f\x00\t\n\f\r ]/i.test(this.text[this.position]!)) { this.position++; }
      if (this.text[this.position++] !== '>') { this.fail(); }
      return {kind: 'string', value: '', start, end: this.position};
    }
    if ('<>[]{}'.includes(first)) {
      if ((first === '<' || first === '>') && this.text[this.position] === first) { this.position++; }
      return {kind: 'delimiter', value: this.text.slice(start, this.position), start, end: this.position};
    }
    if (first === ')' || first === '/') {
      if (first === ')') { this.fail(); }
    }
    while (this.position < this.text.length && !DELIMITER.test(this.text[this.position]!)) { this.position++; }
    const value = this.text.slice(start + (first === '/' ? 1 : 0), this.position);
    return {kind: first === '/' ? 'name' : 'word', value: first === '/' ? value.replace(/#([\da-f]{2})/gi, (_, hex: string) => String.fromCharCode(parseInt(hex, 16))) : value, start, end: this.position};
  }

  /** @returns {string} One complete value, skipping nested arrays/dictionaries iteratively. */
  public value(): string {
    const first = this.next();
    if (!first) { return this.fail(); }
    const stack: string[] = [];
    if (first.kind === 'delimiter' && first.value === '<<') { stack.push('>>'); }
    else if (first.kind === 'delimiter' && first.value === '[') { stack.push(']'); }
    else if (first.kind === 'delimiter') { return this.fail(); }
    while (stack.length) {
      const token = this.next();
      if (!token) { return this.fail(); }
      if (token.kind !== 'delimiter') { continue; }
      if (token.value === '<<') { stack.push('>>'); }
      else if (token.value === '[') { stack.push(']'); }
      else if (token.value !== stack.pop()) { return this.fail(); }
    }
    if (first.kind === 'word' && /^\d+$/.test(first.value)) {
      const end = this.position;
      const generation = this.next(); const reference = this.next();
      if (generation?.kind !== 'word' || !/^\d+$/.test(generation.value) || reference?.value !== 'R') { this.position = end; }
    }
    return this.text.slice(first.start, this.position);
  }

  /** @returns {Map<string, string>} Top-level names and raw values; arbitrary values remain unexecuted. */
  public dictionary(): Map<string, string> {
    const opening = this.next();
    if (opening?.kind !== 'delimiter' || opening.value !== '<<') { return this.fail(); }
    const fields = new Map<string, string>();
    while (true) {
      const key = this.next();
      if (key?.value === '>>' && key.kind === 'delimiter') { return fields; }
      if (key?.kind !== 'name' || fields.has(key.value)) { return this.fail(); }
      fields.set(key.value, this.value());
    }
  }

  /** @returns {never} Syntax mismatch is separate from document corruption. */
  private fail(): never { throw new ProcessingError({code: 'PDF_STRUCTURE', severity: 'error', details: {reason: 'TRAILER'}}); }
}

/**
 * Detects the first object's linearization dictionary, rather than searching strings for a name.
 * @param {string} head Bounded leading bytes.
 * @returns {boolean} Whether a positive linearization dictionary is present.
 */
export function linearizedPdf(head: string): boolean {
  try {
    const syntax = new PdfSyntax(head);
    const object = syntax.next(); const generation = syntax.next(); const marker = syntax.next();
    if (!/^\d+$/.test(object?.value ?? '') || !/^\d+$/.test(generation?.value ?? '') || marker?.value !== 'obj') { return false; }
    return Number(syntax.dictionary().get('Linearized')) > 0;
  } catch { return false; }
}
