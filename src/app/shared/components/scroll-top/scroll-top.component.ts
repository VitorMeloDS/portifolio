import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ScrollSpyService } from '../../../core/services/scroll-spy.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-scroll-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    @if (scrollSpy.showScrollTop()) {
      <button
        type="button"
        class="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110"
        style="background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))"
        (click)="scrollSpy.scrollToTop()"
        aria-label="Voltar ao topo"
      >
        <app-icon name="arrow-up" [size]="20" />
      </button>
    }
  `,
})
export class ScrollTopComponent {
  readonly scrollSpy = inject(ScrollSpyService);
}
