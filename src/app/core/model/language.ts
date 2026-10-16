/**
 * Supported language metadata. Add a catalog and flag asset when adding a language.
 * @type {ReadonlyArray<{code: string, name: string, flag: string}>}
 */
export const LANGUAGES = [
  {code: 'en', name: 'English', flag: 'gb'},
  {code: 'it', name: 'Italiano', flag: 'it'}
] as const;

/** A language code present in the application registry. */
export type LanguageCode = typeof LANGUAGES[number]['code'];

/**
 * Stable storage key; stores only the chosen language, never selected files.
 * @type {string}
 */
export const LANGUAGE_STORAGE_KEY = 'bhw.language';
