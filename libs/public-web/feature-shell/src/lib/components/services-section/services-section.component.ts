import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ServiceCard {
  icon: string;
  title: string;
  description: string;
  accent?: boolean;
  link?: string;
}

@Component({
  selector: 'lib-services-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services-section.component.html',
  styleUrls: ['./services-section.component.scss'],
})
export class ServicesSectionComponent {
  readonly featuredServices: ServiceCard[] = [
    {
      icon: 'ri-stack-line',
      title: 'Product strategy & discovery',
      description:
        'Rapid research, journey mapping, and service blueprints that uncover the right opportunities before sprint one.',
      accent: true,
      link: '/services',
    },
    {
      icon: 'ri-artboard-2-line',
      title: 'Design systems & UX architecture',
      description:
        'Scalable design languages, accessibility audits, and component libraries that power cohesive customer experiences.',
      link: '/services',
    },
    {
      icon: 'ri-cloud-line',
      title: 'Cloud-native Angular platforms',
      description:
        'Nx-powered workspaces, API integrations, and CI/CD pipelines engineered for velocity and governance.',
      link: '/services',
    },
  ];

  readonly supportingServices: ServiceCard[] = [
    {
      icon: 'ri-team-line',
      title: 'Dedicated delivery squads',
      description:
        'Cross-functional pods with product, UX, engineering, QA, and DevOps embedded alongside your team.',
    },
    {
      icon: 'ri-secure-payment-line',
      title: 'Security & compliance',
      description:
        'Enterprise-grade DevSecOps practices, audits, and remediation plans for regulated industries.',
    },
    {
      icon: 'ri-bar-chart-2-line',
      title: 'Analytics & optimization',
      description:
        'Experimentation frameworks, observability, and dashboards that convert data into confident decisions.',
    },
    {
      icon: 'ri-customer-service-2-line',
      title: 'Lifecycle partnership',
      description:
        'Enablement, training, and managed services that keep your product evolving long after launch.',
    },
  ];
}
