import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConfigService } from '@vicbts/shared/data-access/config';

@Component({
  selector: 'lib-public-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './public-footer.component.html',
  styleUrls: ['./public-footer.component.scss'],
})
export class PublicFooterComponent implements OnInit {
  private configService = inject(ConfigService);

  currentYear = new Date().getFullYear();
  appName = '';

  footerLinks = {
    company: [
      { label: 'About Us', route: '/about' },
      { label: 'Services', route: '/services' },
      { label: 'Contact', route: '/contact' },
    ],
    resources: [
      { label: 'Blog', route: '/blog' },
      { label: 'Documentation', route: '/docs' },
      { label: 'Support', route: '/support' },
    ],
    legal: [
      { label: 'Privacy Policy', route: '/privacy' },
      { label: 'Terms of Service', route: '/terms' },
      { label: 'Cookie Policy', route: '/cookies' },
    ],
  };

  socialLinks = [
    { icon: 'ri-facebook-fill', url: 'https://facebook.com', label: 'Facebook' },
    { icon: 'ri-twitter-x-fill', url: 'https://twitter.com', label: 'Twitter' },
    { icon: 'ri-linkedin-fill', url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: 'ri-github-fill', url: 'https://github.com', label: 'GitHub' },
  ];

  ngOnInit(): void {
    this.configService.config$.subscribe((config) => {
      if (config) {
        this.appName = config.appName;
      }
    });
  }
}
