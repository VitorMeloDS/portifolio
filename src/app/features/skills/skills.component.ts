import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO_DATA } from '../../data/portfolio.data';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionTitleComponent, GlassCardComponent, RevealOnScrollDirective, IconComponent],
  template: `
    <section id="skills" data-section="skills" class="section-padding">
      <div class="container-custom">
        <app-section-title
          title="Habilidades"
          subtitle="Competências"
          description="Stack técnica e soft skills desenvolvidas ao longo da carreira"
        />

        <div class="grid gap-8 lg:grid-cols-2">
          <div class="space-y-4">
            <h3 class="text-lg font-bold" appRevealOnScroll="0">Stack técnica</h3>
            <div class="grid gap-4">
              @for (group of skillCategories; track group.category; let i = $index) {
                <app-glass-card [appRevealOnScroll]="i * 40">
                  <h4 class="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--accent-secondary)]">
                    {{ group.category }}
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    @for (tech of group.technologies; track tech) {
                      <span
                        class="rounded-md px-3 py-1.5 text-sm font-mono"
                        style="background: var(--glass-bg); border: 1px solid var(--glass-border)"
                      >
                        {{ tech }}
                      </span>
                    }
                  </div>
                </app-glass-card>
              }
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-bold" appRevealOnScroll="0">Soft Skills</h3>
            <div class="grid gap-4 sm:grid-cols-2">
              @for (skill of softSkills; track skill.name; let i = $index) {
                <app-glass-card [appRevealOnScroll]="i * 40">
                  <div
                    class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                    style="background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))"
                  >
                    <app-icon [name]="getIconName(skill.icon)" [size]="20" class="text-[var(--accent-primary)]" />
                  </div>
                  <h4 class="mb-1 font-semibold">{{ skill.name }}</h4>
                  <p class="text-sm text-[var(--text-secondary)]">{{ skill.description }}</p>
                </app-glass-card>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  readonly skillCategories = PORTFOLIO_DATA.skillCategories;
  readonly softSkills = PORTFOLIO_DATA.softSkills;

  getIconName(iconName: string): IconName {
    const map: Record<string, IconName> = {
      crown: 'crown',
      'message-circle': 'message-circle',
      users: 'users',
      zap: 'zap',
      shield: 'shield',
      'graduation-cap': 'graduation-cap',
    };
    return map[iconName] ?? 'crown';
  }
}
