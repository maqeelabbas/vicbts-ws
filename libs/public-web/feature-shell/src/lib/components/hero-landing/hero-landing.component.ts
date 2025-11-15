import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VHeroSectionComponent } from '@vicbts/shared/ui';

@Component({
  selector: 'lib-hero-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, VHeroSectionComponent],
  template: `
    <v-hero-section
      badge="WELCOME"
      alignment="center">
      <h1 hero-title>
        Transform Your Business with
        <span class="gradient-text">Innovative Solutions</span>
      </h1>
      <p hero-description class="hero-lead">
        Empower your team with cutting-edge tools and strategies designed
        to drive growth, efficiency, and success in the digital age.
      </p>
      <div hero-actions>
        <button class="btn btn-lg btn-primary" routerLink="/contact">
          Get Started Free
        </button>
        <button class="btn btn-lg btn-outline" routerLink="/services">
          Explore Services
        </button>
      </div>
    </v-hero-section>
  `,
  styles: [
    `
      @import '../../../../../../shared/ui/src/lib/theme/theme';

      .hero-lead {
        font-size: var(--font-size-xl);
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
      }

      .gradient-text {
        background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .btn {
        padding: var(--spacing-md) var(--spacing-2xl);
        border-radius: var(--radius-button);
        font-weight: var(--font-weight-semibold);
        transition: all 0.3s ease;
        cursor: pointer;
        border: 2px solid transparent;

        &-lg {
          padding: var(--spacing-lg) var(--spacing-3xl);
          font-size: var(--font-size-lg);
        }

        &-primary {
          background-color: var(--color-primary-600);
          color: white;
          border-color: var(--color-primary-600);

          &:hover {
            background-color: var(--color-primary-700);
            border-color: var(--color-primary-700);
            box-shadow: var(--elevation-button-hover);
            transform: translateY(-2px);
          }
        }

        &-outline {
          background-color: transparent;
          color: var(--color-primary-600);
          border-color: var(--color-primary-600);

          &:hover {
            background-color: var(--color-primary-50);
          }
        }
      }
    `,
  ],
})
export class HeroLandingComponent {}
