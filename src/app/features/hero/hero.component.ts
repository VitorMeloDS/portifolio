import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PORTFOLIO_DATA } from '../../data/portfolio.data';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <section id="hero" data-section="hero" class="section-padding flex min-h-screen items-center pt-24">
      <div class="container-custom">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <div class="hero-content">
            <p class="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-[var(--text-secondary)]">
              <app-icon name="map-pin" [size]="14" />
              {{ personal.location }}
            </p>

            <h1 class="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Olá, eu sou
              <span class="gradient-text block">{{ personal.name }}</span>
            </h1>

            <p class="mb-2 text-xl font-semibold text-[var(--accent-secondary)] sm:text-2xl">
              {{ personal.title }}
            </p>

            <p class="mb-8 max-w-xl text-[var(--text-secondary)] leading-relaxed">
              {{ personal.summary }}
            </p>

            <div class="mb-8 flex flex-wrap gap-4">
              <button type="button" class="btn-primary" (click)="scrollTo('projects')">
                Ver Projetos
                <app-icon name="arrow-down" [size]="18" />
              </button>
              <a
                [href]="personal.resume.url"
                [download]="personal.resume.fileName"
                class="btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Baixar CV
                <app-icon name="download" [size]="18" />
              </a>
              <button type="button" class="btn-outline" (click)="scrollTo('contact')">
                Entrar em Contato
              </button>
            </div>

            <div class="flex gap-3">
              <a
                [href]="personal.socialLinks[1].url"
                target="_blank"
                rel="noopener noreferrer"
                class="glass flex h-11 w-11 items-center justify-center rounded-xl transition-all hover:scale-110 hover:border-[var(--accent-primary)]"
                aria-label="GitHub"
              >
                <app-icon name="github" [size]="20" />
              </a>
              <a
                [href]="personal.socialLinks[0].url"
                target="_blank"
                rel="noopener noreferrer"
                class="glass flex h-11 w-11 items-center justify-center rounded-xl transition-all hover:scale-110 hover:border-[var(--accent-primary)]"
                aria-label="LinkedIn"
              >
                <app-icon name="linkedin" [size]="20" />
              </a>
              <a
                [href]="personal.socialLinks[2].url"
                class="glass flex h-11 w-11 items-center justify-center rounded-xl transition-all hover:scale-110 hover:border-[var(--accent-primary)]"
                aria-label="E-mail"
              >
                <app-icon name="mail" [size]="20" />
              </a>
            </div>
          </div>

          <div class="hero-photo flex justify-center lg:justify-end">
            <div class="gradient-ring shrink-0">
              <div class="overflow-hidden rounded-full bg-[var(--surface)] p-1">
                <picture>
                  <source
                    type="image/webp"
                    srcset="assets/images/profile-320.webp 320w, assets/images/profile-640.webp 640w"
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 256px"
                  />
                  <img
                    src="assets/images/profile-320.jpg"
                    srcset="assets/images/profile-320.jpg 320w, assets/images/profile.jpg 640w"
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 256px"
                    alt="Foto de Vitor Melo da Silva"
                    width="320"
                    height="320"
                    fetchpriority="high"
                    decoding="async"
                    class="block h-64 w-64 rounded-full object-cover sm:h-72 sm:w-72 lg:h-80 lg:w-80"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero-content {
      animation: heroSlideIn 0.7s ease both;
    }

    .hero-photo {
      animation: heroFadeIn 0.7s ease both;
      animation-delay: 0.12s;
      min-width: 16rem;
      min-height: 16rem;
    }

    @media (min-width: 640px) {
      .hero-photo {
        min-width: 18rem;
        min-height: 18rem;
      }
    }

    @media (min-width: 1024px) {
      .hero-photo {
        min-width: 20rem;
        min-height: 20rem;
      }
    }

    @keyframes heroFadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes heroSlideIn {
      from {
        opacity: 0;
        transform: translate3d(0, 16px, 0);
      }
      to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .hero-content,
      .hero-photo {
        animation: none;
      }
    }
  `,
})
export class HeroComponent {
  private readonly scrollSpy = inject(ScrollSpyService);

  readonly personal = PORTFOLIO_DATA.personal;

  scrollTo(sectionId: string): void {
    this.scrollSpy.scrollToSection(sectionId);
  }
}
