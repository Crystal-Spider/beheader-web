import {LANGUAGES, LanguageCode} from '../model/language';

/**
 * Checks persisted or external values against the supported registry.
 * @param {unknown} value Candidate language code.
 * @returns {boolean} Whether the value is a supported language code.
 */
export function isLanguageCode(value: unknown): value is LanguageCode {
  return LANGUAGES.some(language => language.code === value);
}

/**
 * Prefers an explicit saved choice, then the first supported browser language.
 * @param {unknown} saved Previously saved language.
 * @param {readonly string[]} preferred Browser language preferences, in order.
 * @returns {LanguageCode} Supported language, falling back to English.
 */
export function resolveLanguage(saved: unknown, preferred: readonly string[]): LanguageCode {
  if (isLanguageCode(saved)) {
    return saved;
  }
  for (const language of preferred) {
    const code = language.toLowerCase().split('-')[0];
    if (isLanguageCode(code)) {
      return code;
    }
  }
  return 'en';
}
