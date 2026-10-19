/* eslint no-control-regex: off -- PDF whitespace includes NUL. */
import {BinaryReader, invalid} from './binary';
import {CHUNK_BYTES} from './bytes';

/** Single-byte metadata cursor with bounded windows and byte-exact source positions. */
export class TextCursor {
  /** @type {string} */
  private text = '';
  /** @type {number} */
  private start = -1;

  /**
   * @param {BinaryReader} reader Bounded source and cancellation.
   * @param {number} position Initial absolute byte offset.
   * @param {number} end Exclusive metadata boundary.
   */
  public constructor(private readonly reader: BinaryReader, public position: number, private readonly end: number) {}

  /**
   * @param {number} count Maximum lookahead bytes, at most one I/O chunk.
   * @returns {Promise<string>} Available Latin-1 metadata without advancing.
   */
  public async peek(count: number): Promise<string> {
    if (count > CHUNK_BYTES || this.position > this.end) { invalid('PDF_INVALID'); }
    if (this.position < this.start || this.position + Math.min(count, this.end - this.position) > this.start + this.text.length) {
      this.start = this.position;
      this.text = new TextDecoder('latin1').decode(await this.reader.read(this.position, Math.min(CHUNK_BYTES, this.end - this.position)));
    }
    return this.text.slice(this.position - this.start, this.position - this.start + count);
  }

  /** Skips PDF whitespace a window at a time, including adversarial long padding. */
  public async whitespace(): Promise<void> {
    let comment = false;
    while (this.position < this.end) {
      await this.peek(1);
      const text = this.text.slice(this.position - this.start);
      if (comment || text.startsWith('%')) {
        const end = text.search(/[\r\n]/);
        this.position += end < 0 ? text.length : end;
        comment = end < 0;
        continue;
      }
      const length = /^[\x00\t\n\f\r ]*/.exec(text)![0].length;
      this.position += length;
      if (length < text.length && text[length] !== '%') { return; }
    }
  }

  /**
   * @returns {Promise<string>} Remaining prebounded trailer, without a complete metadata ArrayBuffer.
   */
  public async remainder(): Promise<string> {
    const parts: string[] = [];
    while (this.position < this.end) {
      const text = await this.peek(CHUNK_BYTES);
      parts.push(text);
      this.position += text.length;
    }
    return parts.join('');
  }
}
