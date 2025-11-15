import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VFeatureSectionComponent, Feature } from '@vicbts/shared/ui';

@Component({
  selector: 'lib-services-section',
  standalone: true,
  imports: [CommonModule, VFeatureSectionComponent],
  template: `
    <v-feature-section
      sectionTitle="Our Services"
      sectionDescription="Comprehensive solutions designed to help your business thrive"
      sectionIcon="ri-service-fill"
      [features]="services"
      [columns]="3">
    </v-feature-section>
  `,
  styles: [],
})
export class ServicesSectionComponent {
  services: Feature[] = [
    {
      icon: 'ri-rocket-line',
      title: 'Digital Transformation',
      description: 'Modernize your operations with cutting-edge technology and strategic digital solutions.',
    },
    {
      icon: 'ri-bar-chart-line',
      title: 'Business Analytics',
      description: 'Gain actionable insights from your data with advanced analytics and reporting tools.',
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Security & Compliance',
      description: 'Protect your business with enterprise-grade security and regulatory compliance.',
    },
    {
      icon: 'ri-team-line',
      title: 'Team Collaboration',
      description: 'Empower your team with seamless communication and collaboration platforms.',
    },
    {
      icon: 'ri-cloud-line',
      title: 'Cloud Solutions',
      description: 'Scale effortlessly with reliable, secure, and flexible cloud infrastructure.',
    },
    {
      icon: 'ri-customer-service-line',
      title: '24/7 Support',
      description: 'Get help whenever you need it with our dedicated round-the-clock support team.',
    },
  ];
}
