import {describe, expect, it} from 'vitest';

import {isLanguageCode, resolveLanguage} from './language';

describe('language resolution', () => {
  it('preserves an explicit choice over browser preferences', () => {
    expect(resolveLanguage('en', ['it-IT'])).toBe('en');
    expect(resolveLanguage('it', ['en-US'])).toBe('it');
  });

  it('matches regional browser languages without case sensitivity', () => {
    expect(resolveLanguage(null, ['IT-it'])).toBe('it');
    expect(resolveLanguage(undefined, ['en-GB'])).toBe('en');
  });

  it('uses the first supported browser preference', () => {
    expect(resolveLanguage(null, ['fr-FR', 'it-CH', 'en-US'])).toBe('it');
  });

  it('ignores invalid stored data and unsupported browser languages', () => {
    expect(resolveLanguage('fr', ['it-IT'])).toBe('it');
    expect(resolveLanguage({code: 'it'}, ['fr-FR'])).toBe('en');
  });

  it('falls back to English with absent or unknown preferences', () => {
    expect(resolveLanguage(null, [])).toBe('en');
    expect(resolveLanguage(null, ['fr-FR', 'de-DE'])).toBe('en');
  });

  it('accepts only registry codes', () => {
    expect(isLanguageCode('it')).toBe(true);
    expect(isLanguageCode('it-IT')).toBe(false);
    expect(isLanguageCode(null)).toBe(false);
  });
});
