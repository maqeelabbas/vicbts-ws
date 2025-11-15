import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'v-feature-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="v-feature-section">
      <div class="container">
        <div *ngIf="sectionTitle || sectionDescription" class="section-header">
          <div *ngIf="sectionIcon" class="section-icon">
            <i [class]="sectionIcon"></i>
          </div>
          <h2 *ngIf="sectionTitle" class="section-title">{{ sectionTitle }}</h2>
          <p *ngIf="sectionDescription" class="section-description">
            {{ sectionDescription }}
          </p>
        </div>

        <div class="features-grid" [class]="'cols-' + columns">
          <div *ngFor="let feature of features" class="feature-card">
            <div class="feature-icon">
              <i [class]="feature.icon"></i>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>

        <ng-content></ng-content>
      </div>
    </section>
  `,
  styleUrls: ['./v-feature-section.component.scss'],
})
export class VFeatureSectionComponent {
  @Input() sectionTitle?: string;
  @Input() sectionDescription?: string;
  @Input() sectionIcon?: string;
  @Input() features: Feature[] = [];
  @Input() columns: 2 | 3 | 4 = 3;
}
