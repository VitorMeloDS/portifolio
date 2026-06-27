import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PORTFOLIO_DATA } from '../../data/portfolio.data';
import { Project } from '../../core/models/portfolio.models';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionTitleComponent, GlassCardComponent, RevealOnScrollDirective, IconComponent],
  template: `
    <section id="projects" data-section="projects" class="section-padding">
      <div class="container-custom">
        <app-section-title
          title="Projetos"
          subtitle="Portfólio"
          description="Projetos profissionais e iniciativas relevantes da minha trajetória"
        />

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (project of projects; track project.id; let i = $index) {
            <button
              type="button"
              class="reveal-item text-left"
              [appRevealOnScroll]="i * 40"
              (click)="openProject(project)"
            >
              <app-glass-card [extraClass]="'h-full cursor-pointer group hover-lift'">
                <div class="mb-4 flex items-start justify-between gap-2">
                  <h3 class="text-lg font-bold group-hover:gradient-text transition-all">
                    {{ project.title }}
                  </h3>
                  @if (project.demoUrl) {
                    <app-icon name="external-link" [size]="18" class="shrink-0 text-[var(--accent-secondary)]" />
                  }
                </div>

                <p class="mb-3 flex items-center gap-1 text-sm text-[var(--text-muted)]">
                  <app-icon name="building" [size]="14" />
                  {{ project.company }}
                </p>

                <p class="mb-4 line-clamp-3 text-sm text-[var(--text-secondary)]">
                  {{ project.description }}
                </p>

                <div class="mb-4 flex flex-wrap gap-2">
                  @for (tech of project.technologies; track tech) {
                    <span
                      class="rounded-md px-2 py-1 text-xs font-mono"
                      style="background: var(--glass-bg); border: 1px solid var(--glass-border)"
                    >
                      {{ tech }}
                    </span>
                  }
                </div>

                @if (project.isCorporate) {
                  <span
                    class="inline-block rounded-full px-3 py-1 text-xs font-medium"
                    style="background: rgba(139,92,246,0.15); color: var(--accent-primary)"
                  >
                    Projeto corporativo
                  </span>
                }
              </app-glass-card>
            </button>
          }
        </div>
      </div>
    </section>

    @if (selectedProject()) {
      <div
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style="background: rgba(0,0,0,0.6); backdrop-filter: blur(4px)"
        (click)="closeProject()"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="selectedProject()!.title"
      >
        <div class="glass-card max-h-[85vh] max-w-lg overflow-y-auto p-6" (click)="$event.stopPropagation()">
          <div class="mb-4 flex items-start justify-between gap-4">
            <h3 class="text-xl font-bold">{{ selectedProject()!.title }}</h3>
            <button
              type="button"
              class="rounded-lg p-1 hover:bg-[var(--glass-bg)]"
              (click)="closeProject()"
              aria-label="Fechar"
            >
              <app-icon name="x" [size]="20" />
            </button>
          </div>

          <p class="mb-2 text-sm text-[var(--text-muted)]">{{ selectedProject()!.company }}</p>
          <p class="mb-4 text-[var(--text-secondary)] leading-relaxed">{{ selectedProject()!.description }}</p>

          <div class="mb-4 flex flex-wrap gap-2">
            @for (tech of selectedProject()!.technologies; track tech) {
              <span
                class="rounded-md px-2 py-1 text-xs font-mono"
                style="background: var(--glass-bg); border: 1px solid var(--glass-border)"
              >
                {{ tech }}
              </span>
            }
          </div>

          @if (selectedProject()!.demoUrl) {
            <a
              [href]="selectedProject()!.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary inline-flex"
            >
              Ver demo
              <app-icon name="external-link" [size]="16" />
            </a>
          }
        </div>
      </div>
    }
  `,
})
export class ProjectsComponent {
  readonly projects = PORTFOLIO_DATA.projects;
  readonly selectedProject = signal<Project | null>(null);

  openProject(project: Project): void {
    if (project.demoUrl) {
      window.open(project.demoUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    this.selectedProject.set(project);
  }

  closeProject(): void {
    this.selectedProject.set(null);
  }
}
