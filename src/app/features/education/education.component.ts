import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO_DATA } from '../../data/portfolio.data';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-education',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionTitleComponent, GlassCardComponent, RevealOnScrollDirective, IconComponent],
  template: `
    <section id="education" data-section="education" class="section-padding">
      <div class="container-custom">
        <app-section-title
          title="Formação"
          subtitle="Educação"
          description="Graduação, cursos e certificações"
        />

        <div class="mb-12 grid gap-6 md:grid-cols-2">
          @for (edu of education; track edu.id; let i = $index) {
            <app-glass-card [appRevealOnScroll]="i * 40">
              <div
                class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                style="background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))"
              >
                <app-icon name="graduation-cap" [size]="20" class="text-[var(--accent-primary)]" />
              </div>
              <span class="text-xs font-mono uppercase tracking-wider text-[var(--accent-secondary)]">
                {{ edu.status }}
              </span>
              <h3 class="mt-1 mb-1 text-lg font-bold">{{ edu.degree }}</h3>
              <p class="mb-1 font-medium text-[var(--text-secondary)]">{{ edu.institution }}</p>
              <p class="mb-3 text-sm text-[var(--text-muted)]">{{ edu.period }}</p>
              @if (edu.description) {
                <p class="text-sm text-[var(--text-secondary)]">{{ edu.description }}</p>
              }
            </app-glass-card>
          }
        </div>

        <h3 class="mb-6 text-lg font-bold" appRevealOnScroll="0">Certificações</h3>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (cert of certifications; track cert.id; let i = $index) {
            <app-glass-card [extraClass]="'flex gap-4 items-start'" [appRevealOnScroll]="i * 40">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style="background: rgba(6,182,212,0.15)"
              >
                <app-icon name="award" [size]="18" class="text-[var(--accent-secondary)]" />
              </div>
              <div>
                <p class="text-sm font-semibold leading-snug">{{ cert.name }}</p>
                <p class="text-xs text-[var(--text-muted)]">{{ cert.issuer }}</p>
                <p class="mt-1 text-xs font-mono text-[var(--accent-primary)]">{{ cert.issuedAt }}</p>
              </div>
            </app-glass-card>
          }
        </div>
      </div>
    </section>
  `,
})
export class EducationComponent {
  readonly education = PORTFOLIO_DATA.education;
  readonly certifications = PORTFOLIO_DATA.certifications;
}
