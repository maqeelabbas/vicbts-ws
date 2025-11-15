import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface OgTagsData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
}

export interface TwitterCardData {
  card?: string;
  title?: string;
  description?: string;
  image?: string;
  site?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  /**
   * Update page title
   */
  updateTitle(title: string, siteName = 'VicBts'): void {
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    this.titleService.setTitle(fullTitle);
  }

  /**
   * Update meta description
   */
  updateDescription(description: string): void {
    this.metaService.updateTag({ name: 'description', content: description });
  }

  /**
   * Update meta keywords
   */
  updateKeywords(keywords: string[]): void {
    this.metaService.updateTag({ name: 'keywords', content: keywords.join(', ') });
  }

  /**
   * Update Open Graph tags for social sharing
   */
  updateOgTags(data: OgTagsData): void {
    if (data.title) {
      this.metaService.updateTag({ property: 'og:title', content: data.title });
    }
    if (data.description) {
      this.metaService.updateTag({ property: 'og:description', content: data.description });
    }
    if (data.image) {
      this.metaService.updateTag({ property: 'og:image', content: data.image });
    }
    if (data.url) {
      this.metaService.updateTag({ property: 'og:url', content: data.url });
    }
    if (data.type) {
      this.metaService.updateTag({ property: 'og:type', content: data.type });
    }
    if (data.siteName) {
      this.metaService.updateTag({ property: 'og:site_name', content: data.siteName });
    }
  }

  /**
   * Update Twitter Card tags
   */
  updateTwitterCard(data: TwitterCardData): void {
    if (data.card) {
      this.metaService.updateTag({ name: 'twitter:card', content: data.card });
    }
    if (data.title) {
      this.metaService.updateTag({ name: 'twitter:title', content: data.title });
    }
    if (data.description) {
      this.metaService.updateTag({ name: 'twitter:description', content: data.description });
    }
    if (data.image) {
      this.metaService.updateTag({ name: 'twitter:image', content: data.image });
    }
    if (data.site) {
      this.metaService.updateTag({ name: 'twitter:site', content: data.site });
    }
  }

  /**
   * Set canonical URL
   */
  setCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /**
   * Inject JSON-LD structured data
   */
  setJsonLd(schema: Record<string, unknown>): void {
    let script: HTMLScriptElement | null = document.querySelector('script[type="application/ld+json"]');
    
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);
  }

  /**
   * Remove JSON-LD structured data
   */
  removeJsonLd(): void {
    const script = document.querySelector('script[type="application/ld+json"]');
    if (script) {
      script.remove();
    }
  }

  /**
   * Update all SEO tags at once
   */
  updatePageSeo(config: {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: string;
    jsonLd?: Record<string, unknown>;
  }): void {
    this.updateTitle(config.title);
    this.updateDescription(config.description);

    if (config.keywords) {
      this.updateKeywords(config.keywords);
    }

    this.updateOgTags({
      title: config.title,
      description: config.description,
      image: config.image,
      url: config.url,
      type: config.type || 'website',
      siteName: 'VicBts',
    });

    this.updateTwitterCard({
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      image: config.image,
    });

    if (config.url) {
      this.setCanonicalUrl(config.url);
    }

    if (config.jsonLd) {
      this.setJsonLd(config.jsonLd);
    }
  }

  /**
   * Generate Organization schema
   */
  getOrganizationSchema(config: {
    name: string;
    url: string;
    logo?: string;
    description?: string;
    contactEmail?: string;
    contactPhone?: string;
    address?: {
      streetAddress?: string;
      addressLocality?: string;
      addressRegion?: string;
      postalCode?: string;
      addressCountry?: string;
    };
    socialProfiles?: string[];
  }): Record<string, unknown> {
    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: config.name,
      url: config.url,
    };

    if (config.logo) {
      schema['logo'] = config.logo;
    }

    if (config.description) {
      schema['description'] = config.description;
    }

    if (config.contactEmail || config.contactPhone) {
      schema['contactPoint'] = {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        ...(config.contactEmail && { email: config.contactEmail }),
        ...(config.contactPhone && { telephone: config.contactPhone }),
      };
    }

    if (config.address) {
      schema['address'] = {
        '@type': 'PostalAddress',
        ...config.address,
      };
    }

    if (config.socialProfiles && config.socialProfiles.length > 0) {
      schema['sameAs'] = config.socialProfiles;
    }

    return schema;
  }

  /**
   * Generate WebPage schema
   */
  getWebPageSchema(config: {
    name: string;
    description: string;
    url: string;
  }): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: config.name,
      description: config.description,
      url: config.url,
    };
  }

  /**
   * Generate BreadcrumbList schema
   */
  getBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  }
}
