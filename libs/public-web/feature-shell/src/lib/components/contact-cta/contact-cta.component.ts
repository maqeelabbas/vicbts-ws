import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VCallToActionComponent } from '@vicbts/shared/ui';

@Component({
  selector: 'lib-contact-cta',
  standalone: true,
  imports: [CommonModule, RouterLink, VCallToActionComponent],
  template: `
    <section class="cta-wrapper" aria-labelledby="ctaTitle">
      <div class="cta-glow" aria-hidden="true"></div>
      <v-call-to-action alignment="horizontal" class="cta-shell">
        <h2 cta-title id="ctaTitle">Ready to co-create your next release?</h2>
        <p cta-description>
          Partner with VicBts to unlock a dedicated team of strategists, designers, and engineers who ship outcomes—not
          just tickets.
        </p>
        <div cta-actions class="cta-actions">
          <a routerLink="/contact" class="btn btn-light">
            <i class="ri-calendar-line" aria-hidden="true"></i>
            Schedule a consultation
          </a>
          <a routerLink="/services" class="btn btn-outline">
            View service catalog
          </a>
        </div>
      </v-call-to-action>
    </section>
  `,
  styles: [
    `
      @import '../../../../../../shared/ui/src/lib/theme/theme';
      @import '../../../../../../shared/ui/src/lib/theme/mixins';

      :host {
        display: block;
      }

      .cta-wrapper {
        position: relative;
        padding: var(--spacing-5xl) 0;
      }

      .cta-glow {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at left, rgba(102, 108, 255, 0.4), transparent 60%),
          radial-gradient(circle at right, rgba(54, 166, 255, 0.3), transparent 55%);
        filter: blur(20px);
        pointer-events: none;
      }

      .cta-shell {
        position: relative;
        z-index: 1;
        margin: 0 auto;
        max-width: 1100px;
        border-radius: var(--radius-4xl);
        padding: clamp(var(--spacing-3xl), 5vw, var(--spacing-5xl));
        background: linear-gradient(135deg, rgba(102, 108, 255, 0.92), rgba(54, 166, 255, 0.88));
        color: white;
        box-shadow: var(--elevation-card-hover);
        overflow: hidden;

        &::after {
          content: '';
          position: absolute;
          width: 420px;
          height: 420px;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 50%;
          top: -160px;
          right: -120px;
          filter: blur(0px);
          opacity: 0.7;
        }
      }

      [cta-title] {
        font-size: clamp(2rem, 3.2vw, 2.75rem);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--spacing-md);
        color: inherit;
      }

      [cta-description] {
        font-size: clamp(var(--font-size-base), 1vw + 1rem, var(--font-size-xl));
        color: rgba(255, 255, 255, 0.9);
        max-width: 600px;
        margin-bottom: var(--spacing-2xl);
      }

      .cta-actions {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-md);
      }

      .btn {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-md) var(--spacing-2xl);
        border-radius: var(--radius-button);
        font-weight: var(--font-weight-semibold);
        text-decoration: none;
        transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        border: 1px solid transparent;

        &:hover {
          transform: translateY(-2px);
          box-shadow: var(--elevation-button-hover);
        }

        &.btn-light {
          background: white;
          color: var(--color-primary-600);
        }

        &.btn-outline {
          background: transparent;
          color: white;
          border-color: rgba(255, 255, 255, 0.5);

          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        }

        i {
          font-size: var(--font-size-xl);
        }
      }
    `,
  ],
})
export class ContactCtaComponent {}
