import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO_DATA } from '../../data/portfolio.data';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionTitleComponent, RevealOnScrollDirective, IconComponent],
  template: `
    <section id="experience" data-section="experience" class="section-padding">
      <div class="container-custom">
        <app-section-title
          title="Experiência"
          subtitle="Trajetória"
          description="Minha jornada profissional em desenvolvimento de software"
        />

        <div class="relative mx-auto max-w-3xl">
          <div
            class="absolute top-0 bottom-0 left-4 w-0.5 md:left-1/2 md:-translate-x-px"
            style="background: linear-gradient(180deg, var(--accent-primary), var(--accent-secondary))"
          ></div>

          @for (exp of experiences; track exp.id; let i = $index) {
            <div
              class="relative mb-10 pl-12 md:pl-0"
              [class.md:pr-[calc(50%+2rem)]]="i % 2 === 0"
              [class.md:pl-[calc(50%+2rem)]]="i % 2 !== 0"
              [appRevealOnScroll]="i * 40"
            >
              <div
                class="absolute top-6 left-2.5 z-10 h-4 w-4 rounded-full border-2 md:left-1/2 md:-translate-x-1/2"
                style="background: var(--surface); border-color: var(--accent-primary); box-shadow: 0 0 12px rgba(139,92,246,0.5)"
              ></div>

              <div class="glass-card p-6">
                <div class="mb-2 flex flex-wrap items-center gap-2">
                  <app-icon name="briefcase" [size]="16" class="text-[var(--accent-secondary)]" />
                  <span class="text-sm font-mono text-[var(--accent-primary)]">{{ exp.period }}</span>
                </div>

                <h3 class="mb-1 text-lg font-bold">{{ exp.role }}</h3>
                <p class="mb-1 font-semibold text-[var(--accent-secondary)]">{{ exp.company }}</p>
                <p class="mb-4 flex items-center gap-1 text-sm text-[var(--text-muted)]">
                  <app-icon name="map-pin" [size]="14" />
                  {{ exp.location }}
                </p>

                <ul class="space-y-2">
                  @for (highlight of exp.highlights; track highlight) {
                    <li class="flex gap-2 text-sm text-[var(--text-secondary)]">
                      <span
                        class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style="background: var(--accent-secondary)"
                      ></span>
                      {{ highlight }}
                    </li>
                  }
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ExperienceComponent {
  readonly experiences = PORTFOLIO_DATA.experiences;
}
