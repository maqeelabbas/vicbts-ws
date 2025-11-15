import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'v-section-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="v-section-title" [class.text-left]="alignment === 'left'">
      <div *ngIf="icon" class="section-icon">
        <i [class]="icon"></i>
      </div>
      <h2 class="section-title">
        <ng-content select="[title]"></ng-content>
        <span *ngIf="title">{{ title }}</span>
      </h2>
      <p *ngIf="description" class="section-description">{{ description }}</p>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./v-section-title.component.scss'],
})
export class VSectionTitleComponent {
  @Input() title?: string;
  @Input() description?: string;
  @Input() icon?: string;
  @Input() alignment: 'center' | 'left' = 'center';
}
