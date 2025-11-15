import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VCardComponent } from '@vicbts/shared/ui';

@Component({
  selector: 'lib-about-page',
  standalone: true,
  imports: [CommonModule, VCardComponent],
  template: `
    <div class="page-container">
      <lib-v-card title="About Us" subtitle="Learn more about our mission">
        <div class="about-content">
          <section class="about-section">
            <h2>Our Mission</h2>
            <p>
              We are dedicated to providing exceptional services and solutions
              to help businesses thrive in the digital age.
            </p>
          </section>

          <section class="about-section">
            <h2>Our Values</h2>
            <ul>
              <li><strong>Innovation:</strong> We embrace new technologies and ideas</li>
              <li><strong>Quality:</strong> We deliver excellence in everything we do</li>
              <li><strong>Integrity:</strong> We operate with honesty and transparency</li>
              <li><strong>Customer Focus:</strong> Our clients' success is our success</li>
            </ul>
          </section>

          <section class="about-section">
            <h2>Contact Information</h2>
            <p>Email: contact@vicbts.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </section>
        </div>
      </lib-v-card>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .about-content {
      padding: 1rem;
    }

    .about-section {
      margin-bottom: 2rem;
    }

    .about-section h2 {
      color: #566a7f;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .about-section p {
      color: #8592a3;
      line-height: 1.6;
      margin: 0.5rem 0;
    }

    .about-section ul {
      list-style: none;
      padding: 0;
    }

    .about-section li {
      padding: 0.75rem 0;
      border-bottom: 1px solid #d9dee3;
      color: #8592a3;
    }

    .about-section li:last-child {
      border-bottom: none;
    }

    .about-section strong {
      color: #566a7f;
    }
  `],
})
export class AboutPageComponent {}
