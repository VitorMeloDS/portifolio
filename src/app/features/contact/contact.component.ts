import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PORTFOLIO_DATA } from '../../data/portfolio.data';
import { ContactLink } from '../../core/models/portfolio.models';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionTitleComponent, GlassCardComponent, RevealOnScrollDirective, IconComponent],
  template: `
    <section id="contact" data-section="contact" class="section-padding">
      <div class="container-custom">
        <app-section-title
          title="Contato"
          subtitle="Vamos conversar"
          description="Entre em contato pelos canais abaixo. Estou aberto a novas oportunidades e parcerias."
        />

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          @for (link of contactLinks; track link.id; let i = $index) {
            @if (link.action === 'copy') {
              <button
                type="button"
                class="text-left transition-transform hover:-translate-y-1"
                [appRevealOnScroll]="i * 40"
                (click)="copyEmail(link)"
              >
                <app-glass-card [extraClass]="'h-full cursor-pointer group'">
                  <div
                    class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors group-hover:scale-110"
                    style="background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))"
                  >
                    @if (copied()) {
                      <app-icon name="check" [size]="22" class="text-green-400" />
                    } @else {
                      <app-icon [name]="getIconName(link.icon)" [size]="22" class="text-[var(--accent-primary)]" />
                    }
                  </div>
                  <p class="mb-1 text-sm text-[var(--text-muted)]">{{ link.label }}</p>
                  <p class="font-semibold break-all">{{ link.value }}</p>
                  <p class="mt-2 text-xs text-[var(--accent-secondary)]">
                    {{ copied() ? 'Copiado!' : 'Clique para copiar' }}
                  </p>
                </app-glass-card>
              </button>
            } @else {
              <a
                [href]="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="block transition-transform hover:-translate-y-1"
                [appRevealOnScroll]="i * 40"
              >
                <app-glass-card [extraClass]="'h-full group'">
                  <div
                    class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style="background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))"
                  >
                    <app-icon [name]="getIconName(link.icon)" [size]="22" class="text-[var(--accent-primary)]" />
                  </div>
                  <p class="mb-1 text-sm text-[var(--text-muted)]">{{ link.label }}</p>
                  <p class="font-semibold">{{ link.value }}</p>
                </app-glass-card>
              </a>
            }
          }
        </div>

        <a
          [href]="resume.url"
          [download]="resume.fileName"
          class="reveal-item mt-6 block transition-transform hover:-translate-y-1"
          appRevealOnScroll="0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <app-glass-card [extraClass]="'group flex flex-col items-center gap-3 py-6 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left'">
            <div class="flex items-center gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                style="background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))"
              >
                <app-icon name="download" [size]="22" class="text-[var(--accent-primary)]" />
              </div>
              <div>
                <p class="font-semibold">Baixar currículo em PDF</p>
                <p class="text-sm text-[var(--text-secondary)]">Versão atualizada para recrutadores</p>
              </div>
            </div>
            <span class="btn-primary shrink-0">Download</span>
          </app-glass-card>
        </a>
      </div>
    </section>
  `,
})
export class ContactComponent {
  readonly contactLinks = PORTFOLIO_DATA.contactLinks;
  readonly resume = PORTFOLIO_DATA.personal.resume;
  readonly copied = signal(false);

  getIconName(iconName: string): IconName {
    const map: Record<string, IconName> = {
      mail: 'mail',
      linkedin: 'linkedin',
      github: 'github',
      globe: 'globe',
    };
    return map[iconName] ?? 'mail';
  }

  async copyEmail(link: ContactLink): Promise<void> {
    try {
      await navigator.clipboard.writeText(link.value);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      window.location.href = link.url;
    }
  }
}
