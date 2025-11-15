import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VCardComponent } from '@vicbts/shared/ui';

@Component({
  selector: 'lib-home-page',
  standalone: true,
  imports: [CommonModule, VCardComponent],
  template: `
    <div class="page-container">
      <lib-v-card title="Welcome to VicBts" subtitle="Your trusted platform">
        <div class="home-content">
          <h2>Getting Started</h2>
          <p>Welcome to the public web application. Explore our features and services.</p>
          
          <div class="features-grid">
            <div class="feature-item">
              <span class="feature-icon">🚀</span>
              <h3>Fast Performance</h3>
              <p>Built with modern technologies for optimal speed</p>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🔒</span>
              <h3>Secure</h3>
              <p>Your data is protected with industry-standard security</p>
            </div>
            <div class="feature-item">
              <span class="feature-icon">📱</span>
              <h3>Responsive</h3>
              <p>Works seamlessly on all devices</p>
            </div>
          </div>
        </div>
      </lib-v-card>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .home-content {
      padding: 1rem;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .feature-item {
      text-align: center;
      padding: 1.5rem;
      border-radius: 0.5rem;
      background-color: #f8f9fa;
      transition: transform 0.2s ease;
    }

    .feature-item:hover {
      transform: translateY(-4px);
    }

    .feature-icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 1rem;
    }

    .feature-item h3 {
      margin: 0.5rem 0;
      color: #566a7f;
    }

    .feature-item p {
      margin: 0;
      color: #8592a3;
      font-size: 0.875rem;
    }
  `],
})
export class HomePageComponent {}
