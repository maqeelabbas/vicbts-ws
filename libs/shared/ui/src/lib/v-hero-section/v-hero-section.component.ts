import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'v-hero-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="v-hero-section" [class.has-background]="backgroundImage">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text" [class.text-center]="alignment === 'center'">
            <div *ngIf="badge" class="hero-badge">{{ badge }}</div>
            <h1 class="hero-title">
              <ng-content select="[hero-title]"></ng-content>
              <span *ngIf="title">{{ title }}</span>
            </h1>
            <p *ngIf="subtitle" class="hero-subtitle">{{ subtitle }}</p>
            <ng-content select="[hero-description]"></ng-content>
            <div class="hero-actions">
              <ng-content select="[hero-actions]"></ng-content>
            </div>
          </div>
          <div *ngIf="imageSrc" class="hero-image">
            <img [src]="imageSrc" [alt]="imageAlt" />
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./v-hero-section.component.scss'],
})
export class VHeroSectionComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() badge?: string;
  @Input() imageSrc?: string;
  @Input() imageAlt = '';
  @Input() backgroundImage?: string;
  @Input() alignment: 'left' | 'center' = 'center';
}
