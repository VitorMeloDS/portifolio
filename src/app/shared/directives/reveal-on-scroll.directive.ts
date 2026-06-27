import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appRevealOnScroll]',
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private observer: IntersectionObserver | null = null;
  private revealed = false;

  /** Delay em ms para animação escalonada (máx. 250ms). */
  readonly delay = input<number | string>(0, { alias: 'appRevealOnScroll' });

  ngOnInit(): void {
    const element = this.el.nativeElement;

    if (this.prefersReducedMotion()) {
      this.renderer.addClass(element, 'reveal-visible');
      return;
    }

    const delayMs = Math.min(Number(this.delay()) || 0, 250);
    element.style.setProperty('--reveal-delay', `${delayMs}ms`);

    // Conteúdo acima da dobra: revela sem esconder primeiro (evita flash vazio no hero)
    requestAnimationFrame(() => {
      if (this.isInViewport(element)) {
        this.reveal(element);
        return;
      }

      this.renderer.addClass(element, 'reveal-hidden');
      this.startObserver(element);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private startObserver(element: HTMLElement): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.reveal(element);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -5% 0px',
      },
    );

    this.observer.observe(element);
  }

  private reveal(element: HTMLElement): void {
    if (this.revealed) {
      return;
    }

    this.revealed = true;
    this.observer?.disconnect();
    this.observer = null;

    this.renderer.removeClass(element, 'reveal-hidden');
    this.renderer.addClass(element, 'reveal-visible');
  }

  private isInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top < viewHeight * 0.92 && rect.bottom > 0;
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
