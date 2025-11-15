import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VCallToActionComponent } from '@vicbts/shared/ui';

@Component({
  selector: 'lib-contact-cta',
  standalone: true,
  imports: [CommonModule, RouterLink, VCallToActionComponent],
  template: `
    <v-call-to-action
      alignment="horizontal">
      <h2 cta-title>Ready to Transform Your Business?</h2>
      <p cta-description>
        Join hundreds of companies that trust us to deliver exceptional results.
        Let's build something amazing together.
      </p>
      <div cta-actions>
        <button class="btn btn-white btn-lg" routerLink="/contact">
          <i class="ri-message-line"></i>
          Get In Touch
        </button>
        <button class="btn btn-outline-white btn-lg" routerLink="/services">
          <i class="ri-book-open-line"></i>
          View Services
        </button>
      </div>
    </v-call-to-action>
  `,
  styles: [
    `
      @import '../../../../../../shared/ui/src/lib/theme/theme';

      .btn {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-md) var(--spacing-xl);
        border-radius: var(--radius-button);
        font-weight: var(--font-weight-semibold);
        transition: all 0.3s ease;
        cursor: pointer;
        border: 2px solid transparent;

        &-lg {
          padding: var(--spacing-lg) var(--spacing-2xl);
          font-size: var(--font-size-lg);
        }

        &-white {
          background-color: white;
          color: var(--color-primary-600);
          border-color: white;

          &:hover {
            box-shadow: var(--elevation-button-hover);
            transform: translateY(-2px);
          }
        }

        &-outline-white {
          background-color: transparent;
          color: white;
          border-color: white;

          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
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
