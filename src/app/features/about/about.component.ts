import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO_DATA } from '../../data/portfolio.data';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionTitleComponent, GlassCardComponent, RevealOnScrollDirective],
  template: `
    <section id="about" data-section="about" class="section-padding">
      <div class="container-custom">
        <app-section-title
          title="Sobre mim"
          subtitle="Quem sou eu"
          description="Conheça minha trajetória e abordagem profissional"
        />

        <app-glass-card appRevealOnScroll="0">
          <div class="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            @for (paragraph of about.paragraphs; track $index) {
              <p>{{ paragraph }}</p>
            }
          </div>

          <div class="mt-8 flex flex-wrap gap-2">
            @for (highlight of about.highlights; track highlight) {
              <span
                class="rounded-full px-4 py-2 text-sm font-medium font-mono"
                style="background: linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.15)); border: 1px solid var(--glass-border)"
              >
                {{ highlight }}
              </span>
            }
          </div>
        </app-glass-card>
      </div>
    </section>
  `,
})
export class AboutComponent {
  readonly about = PORTFOLIO_DATA.about;
}
