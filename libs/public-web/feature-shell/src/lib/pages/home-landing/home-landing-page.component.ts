import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroLandingComponent } from '../../components/hero-landing/hero-landing.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { TestimonialsSectionComponent } from '../../components/testimonials-section/testimonials-section.component';
import { ContactCtaComponent } from '../../components/contact-cta/contact-cta.component';
import { TrustedByComponent } from '../../components/trusted-by/trusted-by.component';
import { SolutionsHighlightComponent } from '../../components/solutions-highlight/solutions-highlight.component';
import { MetricsShowcaseComponent } from '../../components/metrics-showcase/metrics-showcase.component';
import { SeoService } from '@vicbts/shared/util';

@Component({
  selector: 'lib-home-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroLandingComponent,
    TrustedByComponent,
    ServicesSectionComponent,
    SolutionsHighlightComponent,
    MetricsShowcaseComponent,
    TestimonialsSectionComponent,
    ContactCtaComponent,
  ],
  template: `
    <div class="home-landing-page">
      <lib-hero-landing></lib-hero-landing>
      <lib-trusted-by></lib-trusted-by>
      <lib-services-section></lib-services-section>
      <lib-solutions-highlight></lib-solutions-highlight>
      <lib-metrics-showcase></lib-metrics-showcase>
      <lib-testimonials-section></lib-testimonials-section>
      <lib-contact-cta></lib-contact-cta>
    </div>
  `,
  styles: [
    `
      .home-landing-page {
        display: flex;
        flex-direction: column;
        gap: 0;
      }
    `,
  ],
})
export class HomeLandingPageComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updatePageSeo({
      title: 'Home',
      description: 'Transform your business with innovative solutions. VicBts provides cutting-edge digital transformation, analytics, and cloud solutions to accelerate your growth.',
      keywords: ['digital transformation', 'business solutions', 'cloud services', 'analytics', 'innovation'],
      url: 'https://vicbts.com',
      type: 'website',
      image: 'https://vicbts.com/assets/og-image.jpg',
      jsonLd: this.seoService.getOrganizationSchema({
        name: 'VicBts',
        url: 'https://vicbts.com',
        logo: 'https://vicbts.com/assets/logo.png',
        description: 'Empowering businesses with innovative solutions for a digital future',
        contactEmail: 'contact@vicbts.com',
        contactPhone: '+1 (555) 123-4567',
        address: {
          streetAddress: '123 Business St, Suite 100',
          addressLocality: 'City',
          addressRegion: 'State',
          postalCode: '12345',
          addressCountry: 'US',
        },
        socialProfiles: [
          'https://facebook.com/vicbts',
          'https://twitter.com/vicbts',
          'https://linkedin.com/company/vicbts',
          'https://github.com/vicbts',
        ],
      }),
    });
  }
}
