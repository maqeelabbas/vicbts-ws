import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageContainerComponent } from '../../components/page-container/page-container.component';
import { VSectionTitleComponent } from '@vicbts/shared/ui';
import { SeoService } from '@vicbts/shared/util';

interface ContactForm {
  name: string;
  email: string;
  company: string;
  message: string;
}

@Component({
  selector: 'lib-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PageContainerComponent, VSectionTitleComponent],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updatePageSeo({
      title: 'Contact Us',
      description: 'Get in touch with VicBts. Have a question or ready to start your project? We\'d love to hear from you. Contact our team today.',
      keywords: ['contact', 'get in touch', 'business inquiry', 'support', 'consultation'],
      url: 'https://vicbts.com/contact',
      type: 'website',
      image: 'https://vicbts.com/assets/contact-og-image.jpg',
      jsonLd: this.seoService.getWebPageSchema({
        name: 'Contact Us - VicBts',
        description: 'Get in touch with VicBts for your business needs',
        url: 'https://vicbts.com/contact',
      }),
    });
  }
  formData: ContactForm = {
    name: '',
    email: '',
    company: '',
    message: '',
  };

  submitted = false;

  contactInfo = [
    {
      icon: 'ri-mail-line',
      title: 'Email',
      value: 'contact@vicbts.com',
      link: 'mailto:contact@vicbts.com',
    },
    {
      icon: 'ri-phone-line',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: 'ri-map-pin-line',
      title: 'Office',
      value: '123 Business St, Suite 100\nCity, State 12345',
      link: null,
    },
  ];

  onSubmit(): void {
    if (this.isFormValid()) {
      console.log('Form submitted:', this.formData);
      this.submitted = true;
      // Reset form after 3 seconds
      setTimeout(() => {
        this.submitted = false;
        this.resetForm();
      }, 3000);
    }
  }

  isFormValid(): boolean {
    return !!(
      this.formData.name &&
      this.formData.email &&
      this.formData.message
    );
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      company: '',
      message: '',
    };
  }
}
