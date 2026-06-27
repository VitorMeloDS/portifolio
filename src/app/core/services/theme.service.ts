import { Injectable, PLATFORM_ID, inject, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'portfolio-theme';

  /** Signal que representa o tema atual da aplicação. */
  readonly theme = signal<Theme>('dark');

  /** Classe CSS aplicada ao documento (dark = padrão, light = alternativo). */
  readonly themeClass = computed(() => (this.theme() === 'light' ? 'light' : ''));

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(this.storageKey) as Theme | null;
      if (saved === 'light' || saved === 'dark') {
        this.theme.set(saved);
      }
      this.applyTheme(this.theme());
    }
  }

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, theme);
      this.applyTheme(theme);
    }
  }

  private applyTheme(theme: Theme): void {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }
}
