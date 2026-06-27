import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-12 text-center">
      <p class="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--accent-secondary)]">
        {{ subtitle() }}
      </p>
      <h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
        <span class="gradient-text">{{ title() }}</span>
      </h2>
      @if (description()) {
        <p class="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">{{ description() }}</p>
      }
    </div>
  `,
})
export class SectionTitleComponent {
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly description = input('');
}
