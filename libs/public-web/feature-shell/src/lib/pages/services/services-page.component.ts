import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageContainerComponent } from '../../components/page-container/page-container.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { ContactCtaComponent } from '../../components/contact-cta/contact-cta.component';
import { VSectionTitleComponent, VFeatureSectionComponent, Feature } from '@vicbts/shared/ui';
import { SeoService } from '@vicbts/shared/util';

@Component({
  selector: 'lib-services-page',
  standalone: true,
  imports: [
    CommonModule,
    PageContainerComponent,
    ServicesSectionComponent,
    ContactCtaComponent,
    VSectionTitleComponent,
    VFeatureSectionComponent,
  ],
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss'],
})
export class ServicesPageComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updatePageSeo({
      title: 'Our Services',
      description: 'Comprehensive digital solutions designed to accelerate your transformation. From custom development to cloud infrastructure, we provide expert services to drive your business forward.',
      keywords: ['digital transformation', 'custom development', 'cloud solutions', 'analytics', 'cybersecurity', 'consulting'],
      url: 'https://vicbts.com/services',
      type: 'website',
      image: 'https://vicbts.com/assets/services-og-image.jpg',
      jsonLd: this.seoService.getWebPageSchema({
        name: 'Our Services - VicBts',
        description: 'Comprehensive digital solutions designed to accelerate your transformation',
        url: 'https://vicbts.com/services',
      }),
    });
  }
  coreServices: Feature[] = [
    {
      icon: 'ri-code-s-slash-line',
      title: 'Custom Development',
      description: 'Tailored software solutions built to your exact specifications and requirements.',
    },
    {
      icon: 'ri-database-2-line',
      title: 'Data Management',
      description: 'Comprehensive data solutions including migration, integration, and warehousing.',
    },
    {
      icon: 'ri-smartphone-line',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
    },
  ];

  supportServices: Feature[] = [
    {
      icon: 'ri-settings-3-line',
      title: 'Maintenance',
      description: 'Ongoing support and updates to keep your systems running smoothly.',
    },
    {
      icon: 'ri-graduation-cap-line',
      title: 'Training',
      description: 'Comprehensive training programs for your team on our solutions.',
    },
    {
      icon: 'ri-24-hours-line',
      title: 'Emergency Support',
      description: 'Rapid response team available 24/7 for critical issues.',
    },
  ];
}
