import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'v-call-to-action',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="v-call-to-action" [class]="'alignment-' + alignment">
      <div class="container">
        <div class="cta-content">
          <div class="cta-text">
            <h2 class="cta-title">
              <ng-content select="[cta-title]"></ng-content>
              <span *ngIf="title">{{ title }}</span>
            </h2>
            <p *ngIf="description" class="cta-description">{{ description }}</p>
            <ng-content select="[cta-description]"></ng-content>
          </div>
          <div class="cta-actions">
            <ng-content select="[cta-actions]"></ng-content>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./v-call-to-action.component.scss'],
})
export class VCallToActionComponent {
  @Input() title?: string;
  @Input() description?: string;
  @Input() alignment: 'horizontal' | 'vertical' = 'horizontal';
}
