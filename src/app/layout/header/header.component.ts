import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  afterNextRender,
  DestroyRef,
} from '@angular/core';
import { NAVIGATION } from '../../data/portfolio.data';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { ThemeService } from '../../core/services/theme.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <header
      class="site-header fixed top-0 right-0 left-0 z-50"
      [class.site-header--scrolled]="isScrolled()"
      [class.py-3]="isScrolled()"
      [class.py-5]="!isScrolled()"
    >
      <nav class="container-custom flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <button type="button" class="text-lg font-bold gradient-text" (click)="scrollTo('hero')">
          VM
        </button>

        <ul class="hidden items-center gap-1 md:flex">
          @for (item of navItems; track item.id) {
            <li>
              <button
                type="button"
                class="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                [class.text-[var(--accent-primary)]]="scrollSpy.activeSection() === item.id"
                [class.text-[var(--text-secondary)]]="scrollSpy.activeSection() !== item.id"
                [attr.aria-current]="scrollSpy.activeSection() === item.id ? 'page' : null"
                (click)="scrollTo(item.id)"
              >
                {{ item.label }}
              </button>
            </li>
          }
        </ul>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="glass flex h-10 w-10 items-center justify-center rounded-xl transition-transform hover:scale-105"
            (click)="themeService.toggle()"
            [attr.aria-label]="themeService.theme() === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'"
          >
            @if (themeService.theme() === 'dark') {
              <app-icon name="sun" [size]="18" />
            } @else {
              <app-icon name="moon" [size]="18" />
            }
          </button>

          <button
            type="button"
            class="glass flex h-10 w-10 items-center justify-center rounded-xl md:hidden"
            (click)="menuOpen.set(!menuOpen())"
            [attr.aria-expanded]="menuOpen()"
            aria-label="Menu de navegação"
          >
            @if (menuOpen()) {
              <app-icon name="x" [size]="20" />
            } @else {
              <app-icon name="menu" [size]="20" />
            }
          </button>
        </div>
      </nav>

      @if (menuOpen()) {
        <div class="glass mx-4 mt-2 rounded-2xl p-4 md:hidden">
          <ul class="space-y-1">
            @for (item of navItems; track item.id) {
              <li>
                <button
                  type="button"
                  class="w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors"
                  [class.bg-[var(--glass-bg)]]="scrollSpy.activeSection() === item.id"
                  [class.text-[var(--accent-primary)]]="scrollSpy.activeSection() === item.id"
                  (click)="scrollTo(item.id); menuOpen.set(false)"
                >
                  {{ item.label }}
                </button>
              </li>
            }
          </ul>
        </div>
      }
    </header>
  `,
})
export class HeaderComponent {
  readonly scrollSpy = inject(ScrollSpyService);
  readonly themeService = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);

  readonly navItems = NAVIGATION;
  readonly menuOpen = signal(false);
  readonly isScrolled = signal(false);

  constructor() {
    afterNextRender(() => {
      let ticking = false;

      const onScroll = (): void => {
        if (ticking) {
          return;
        }

        ticking = true;
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 48;
          if (scrolled !== this.isScrolled()) {
            this.isScrolled.set(scrolled);
          }
          ticking = false;
        });
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  scrollTo(sectionId: string): void {
    this.scrollSpy.scrollToSection(sectionId);
  }
}
