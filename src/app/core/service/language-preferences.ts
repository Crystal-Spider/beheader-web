import {DOCUMENT} from '@angular/common';
import {Inject, Injectable, Signal, signal} from '@angular/core';
import {TranslocoService} from '@jsverse/transloco';

import {resolveLanguage} from '../logic/language';
import {LANGUAGE_STORAGE_KEY, LanguageCode} from '../model/language';

/** Manages language selection without persisting any file or job data. */
@Injectable({providedIn: 'root'})
export class LanguagePreferences {
  /**
   * Current supported language.
   * @type {WritableSignal<LanguageCode>}
   */
  private readonly selected = signal<LanguageCode>('en');

  /**
   * Read-only language state for controls.
   * @type {Signal<LanguageCode>}
   */
  public readonly language: Signal<LanguageCode> = this.selected.asReadonly();

  /**
   * @param {TranslocoService} transloco Runtime translation service.
   * @param {Document} document Browser document for locale and optional storage access.
   */
  public constructor(private readonly transloco: TranslocoService, @Inject(DOCUMENT) private readonly document: Document) {}

  /** Applies the saved or detected language before the root view renders. */
  public initialize(): void {
    let saved: string | null = null;
    try {
      saved = this.document.defaultView?.localStorage.getItem(LANGUAGE_STORAGE_KEY) ?? null;
    } catch {
      // Storage can be unavailable in restricted browsing contexts.
    }
    const preferred = this.document.defaultView?.navigator.languages ?? [];
    this.apply(resolveLanguage(saved, preferred));
  }

  /**
   * Changes language immediately and remembers it when storage is available.
   * @param {LanguageCode} language Selected supported language.
   */
  public select(language: LanguageCode): void {
    this.apply(language);
    try {
      this.document.defaultView?.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Persistence is optional; selection still works for this visit.
    }
  }

  /**
   * Keeps the application, picker, and document locale in sync.
   * @param {LanguageCode} language Supported language to apply.
   */
  private apply(language: LanguageCode): void {
    this.selected.set(language);
    this.transloco.setActiveLang(language);
    this.document.documentElement.lang = language;
  }
}
