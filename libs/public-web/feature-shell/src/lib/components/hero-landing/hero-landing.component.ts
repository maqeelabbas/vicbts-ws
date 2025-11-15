import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VHeroSectionComponent } from '@vicbts/shared/ui';

@Component({
  selector: 'lib-hero-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, VHeroSectionComponent],
  template: `
    <section class="hero-wrapper">
      <div class="hero-glow" aria-hidden="true"></div>
      <v-hero-section
        class="hero-shell"
        badge="END-TO-END DELIVERY"
        [imageSrc]="heroIllustration"
        imageAlt="Team collaborating around analytics dashboard"
        alignment="left">
        <h1 hero-title>
          Launch software faster with a partner obsessed with experience
        </h1>
        <p hero-description class="hero-lead">
          VicBts blends architecture expertise, product strategy, and human-centered design to ship resilient Angular
          platforms that customers love.
        </p>
        <div hero-actions class="hero-actions">
          <div class="hero-buttons">
            <a routerLink="/contact" class="btn btn-primary">
              <span>Start a project</span>
              <i class="ri-arrow-right-up-line" aria-hidden="true"></i>
            </a>
            <a routerLink="/services" class="btn btn-outline">
              View capabilities
            </a>
          </div>
          <dl class="hero-stats">
            <div>
              <dt>Enterprise releases</dt>
              <dd>120+</dd>
            </div>
            <div>
              <dt>Design systems launched</dt>
              <dd>48</dd>
            </div>
            <div>
              <dt>Stakeholder satisfaction</dt>
              <dd>4.9/5</dd>
            </div>
          </dl>
        </div>
      </v-hero-section>
    </section>
  `,
  styles: [
    `
      @import '../../../../../../shared/ui/src/lib/theme/theme';
      @import '../../../../../../shared/ui/src/lib/theme/mixins';

      :host {
        display: block;
        position: relative;
      }

      .hero-wrapper {
        position: relative;
        overflow: hidden;
      }

      .hero-glow {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: radial-gradient(
            circle at top left,
            rgba(102, 108, 255, 0.25),
            transparent 60%
          ),
          radial-gradient(circle at bottom right, rgba(54, 166, 255, 0.2), transparent 55%);
        filter: blur(12px);
      }

      .hero-shell {
        position: relative;
        z-index: 1;
        padding-top: calc(var(--spacing-5xl) + var(--spacing-lg));
        padding-bottom: var(--spacing-4xl);
      }

      .hero-lead {
        font-size: clamp(var(--font-size-lg), 1.4vw + 1rem, var(--font-size-2xl));
        max-width: 640px;
        color: var(--text-secondary);
      }

      .hero-actions {
        display: grid !important;
        gap: var(--spacing-xl);

        @include tablet {
          grid-template-columns: auto 1fr;
          align-items: center;
        }
      }

      .hero-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-md);
      }

      .btn {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-xs);
        padding: var(--spacing-md) var(--spacing-xl);
        border-radius: var(--radius-button);
        font-weight: var(--font-weight-semibold);
        text-decoration: none;
        transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        border: 1px solid transparent;

        &:hover {
          transform: translateY(-2px);
          box-shadow: var(--elevation-button-hover);
        }

        &.btn-primary {
          background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700));
          color: white;
          border-color: transparent;
        }

        &.btn-outline {
          background: rgba(255, 255, 255, 0.1);
          color: var(--color-primary-600);
          border-color: rgba(102, 108, 255, 0.3);

          &:hover {
            background: rgba(102, 108, 255, 0.1);
          }
        }

        i {
          font-size: var(--font-size-lg);
        }
      }

      .hero-stats {
        display: grid;
        gap: var(--spacing-md);
        grid-template-columns: repeat(2, minmax(0, 1fr));

        @include tablet {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        div {
          padding: var(--spacing-lg);
          border-radius: var(--radius-2xl);
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(102, 108, 255, 0.16);
          text-align: left;
        }

        dt {
          font-size: var(--font-size-xs);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-tertiary);
          margin-bottom: var(--spacing-xs);
        }

        dd {
          margin: 0;
          font-size: clamp(1.75rem, 2.2vw, 2.5rem);
          font-weight: var(--font-weight-bold);
          color: var(--text-primary);
        }
      }
    `,
  ],
})
export class HeroLandingComponent {
  readonly heroIllustration =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(`
      <svg width="560" height="560" viewBox="0 0 560 560" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="560" height="560" rx="64" fill="url(#paint0_linear)"/>
        <g filter="url(#filter0_f)">
          <circle cx="420" cy="160" r="120" fill="#6A7CFF" fill-opacity="0.45"/>
        </g>
        <g filter="url(#filter1_f)">
          <circle cx="160" cy="420" r="140" fill="#36A6FF" fill-opacity="0.35"/>
        </g>
        <rect x="110" y="120" width="340" height="220" rx="32" fill="white" fill-opacity="0.95"/>
        <rect x="150" y="160" width="260" height="28" rx="14" fill="#EEF0FF"/>
        <rect x="150" y="210" width="200" height="18" rx="9" fill="#DEE2FF"/>
        <rect x="150" y="240" width="170" height="18" rx="9" fill="#DEE2FF"/>
        <rect x="150" y="270" width="220" height="18" rx="9" fill="#DEE2FF"/>
        <rect x="180" y="320" width="140" height="18" rx="9" fill="#BFD9FF"/>
        <circle cx="190" cy="440" r="70" fill="white" fill-opacity="0.92"/>
        <path d="M190 390L214 428H166L190 390Z" fill="#6A7CFF" fill-opacity="0.8"/>
        <defs>
          <filter id="filter0_f" x="200" y="-60" width="440" height="440" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feGaussianBlur stdDeviation="50"/>
          </filter>
          <filter id="filter1_f" x="-30" y="230" width="380" height="380" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feGaussianBlur stdDeviation="60"/>
          </filter>
          <linearGradient id="paint0_linear" x1="48" y1="64" x2="512" y2="512" gradientUnits="userSpaceOnUse">
            <stop stop-color="#F7F8FF"/>
            <stop offset="1" stop-color="#EEF4FF"/>
          </linearGradient>
        </defs>
      </svg>
    `);
}
