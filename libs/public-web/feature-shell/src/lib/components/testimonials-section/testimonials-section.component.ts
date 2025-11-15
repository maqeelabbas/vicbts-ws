import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

@Component({
  selector: 'lib-testimonials-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.scss'],
})
export class TestimonialsSectionComponent {
  currentIndex = 0;

  testimonials: Testimonial[] = [
    {
      quote:
        'VicBts transformed our business operations completely. The team is professional, responsive, and truly understands our needs.',
      author: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechCorp Solutions',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=666cff&color=fff',
      rating: 5,
    },
    {
      quote:
        'Outstanding service and results! Their expertise in digital transformation helped us achieve our goals faster than expected.',
      author: 'Michael Chen',
      role: 'CTO',
      company: 'Innovation Labs',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=666cff&color=fff',
      rating: 5,
    },
    {
      quote:
        'The analytics platform they built for us provides incredible insights. Our decision-making has never been better.',
      author: 'Emma Davis',
      role: 'Operations Director',
      company: 'Global Enterprises',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Davis&background=666cff&color=fff',
      rating: 5,
    },
  ];

  get currentTestimonial(): Testimonial {
    return this.testimonials[this.currentIndex];
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  previous(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }
}
