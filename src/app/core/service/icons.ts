import {Injectable} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

import {ICON_FILES} from '../model/icon';

/** Registers only bundled, trusted SVGs; user-provided content never reaches the registry. */
@Injectable({providedIn: 'root'})
export class Icons {
  /**
   * @param {MatIconRegistry} registry Angular Material icon registry.
   * @param {DomSanitizer} sanitizer Marks fixed application asset URLs as trusted.
   */
  public constructor(private readonly registry: MatIconRegistry, private readonly sanitizer: DomSanitizer) {}

  /** Registers the icon set once during application startup. */
  public initialize(): void {
    for (const [name, filename] of Object.entries(ICON_FILES)) {
      this.registry.addSvgIcon(name, this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icon/${filename}.svg`));
    }
  }
}
