import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NAVIGATION, PORTFOLIO_DATA } from '../../data/portfolio.data';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <footer class="border-t border-[var(--glass-border)] section-padding pb-8">
      <div class="container-custom">
        <div class="grid gap-8 md:grid-cols-3">
          <div>
            <p class="text-lg font-bold gradient-text">Vitor Melo</p>
            <p class="mt-2 text-sm text-[var(--text-secondary)]">
              Desenvolvedor Full Stack Pleno | Tech Lead
            </p>
          </div>

          <div>
            <p class="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Navegação
            </p>
            <ul class="space-y-2">
              @for (item of navItems; track item.id) {
                <li>
                  <button
                    type="button"
                    class="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-primary)]"
                    (click)="scrollTo(item.id)"
                  >
                    {{ item.label }}
                  </button>
                </li>
              }
            </ul>
          </div>

          <div>
            <p class="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Redes sociais
            </p>
            <div class="flex gap-3">
              <a
                [href]="personal.socialLinks[0].url"
                target="_blank"
                rel="noopener noreferrer"
                class="glass flex h-10 w-10 items-center justify-center rounded-xl transition-transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <app-icon name="linkedin" [size]="18" />
              </a>
              <a
                [href]="personal.socialLinks[1].url"
                target="_blank"
                rel="noopener noreferrer"
                class="glass flex h-10 w-10 items-center justify-center rounded-xl transition-transform hover:scale-110"
                aria-label="GitHub"
              >
                <app-icon name="github" [size]="18" />
              </a>
              <a
                [href]="personal.socialLinks[2].url"
                class="glass flex h-10 w-10 items-center justify-center rounded-xl transition-transform hover:scale-110"
                aria-label="E-mail"
              >
                <app-icon name="mail" [size]="18" />
              </a>
              <a
                [href]="personal.socialLinks[3].url"
                target="_blank"
                rel="noopener noreferrer"
                class="glass flex h-10 w-10 items-center justify-center rounded-xl transition-transform hover:scale-110"
                aria-label="Website"
              >
                <app-icon name="globe" [size]="18" />
              </a>
            </div>
          </div>
        </div>

        <div class="mt-10 border-t border-[var(--glass-border)] pt-6 text-center text-sm text-[var(--text-muted)]">
          Desenvolvido com Angular 22 por Vitor Melo &copy; {{ year }}
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  private readonly scrollSpy = inject(ScrollSpyService);

  readonly navItems = NAVIGATION;
  readonly personal = PORTFOLIO_DATA.personal;
  readonly year = new Date().getFullYear();

  scrollTo(sectionId: string): void {
    this.scrollSpy.scrollToSection(sectionId);
  }
}
