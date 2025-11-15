import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-page-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      @import '../../../../../../shared/ui/src/lib/theme/mixins';

      .page-container {
        @include container();
        min-height: 60vh;
      }
    `,
  ],
})
export class PageContainerComponent {}
