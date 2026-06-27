import { Injectable, PLATFORM_ID, inject, signal, DestroyRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private observer: IntersectionObserver | null = null;
  private readonly observedIds = new Set<string>();
  private sectionIds: string[] = [];

  readonly activeSection = signal('hero');
  readonly showScrollTop = signal(false);

  init(sectionIds: string[]): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.sectionIds = sectionIds;
    this.setupScrollListener();
    this.setupIntersectionObserver();
    this.refreshObservedSections();

    // Seções carregadas via @defer entram no DOM depois — re-registrar ao rolar
    fromEvent(window, 'scroll')
      .pipe(debounceTime(150), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.refreshObservedSections());
  }

  scrollToSection(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private setupScrollListener(): void {
    fromEvent(window, 'scroll')
      .pipe(
        debounceTime(50),
        map(() => window.scrollY > 400),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((show) => this.showScrollTop.set(show));
  }

  private setupIntersectionObserver(): void {
    this.observer?.disconnect();

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          this.activeSection.set(visible[0].target.id);
        }
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: [0, 0.1, 0.35] },
    );
  }

  /** Observa seções que ainda não estavam no DOM (ex.: blocos @defer). */
  private refreshObservedSections(): void {
    if (!this.observer) {
      return;
    }

    this.sectionIds.forEach((id) => {
      if (this.observedIds.has(id)) {
        return;
      }

      const el = document.getElementById(id);
      if (el) {
        this.observer?.observe(el);
        this.observedIds.add(id);
      }
    });
  }
}
