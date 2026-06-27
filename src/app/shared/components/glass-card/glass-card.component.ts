import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-glass-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="glass-card p-6"
      [class]="extraClass()"
    >
      <ng-content />
    </div>
  `,
})
export class GlassCardComponent {
  readonly extraClass = input('');
}
