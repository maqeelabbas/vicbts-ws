import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BrandLogo {
  name: string;
  tagline: string;
}

@Component({
  selector: 'lib-trusted-by',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trusted-by.component.html',
  styleUrls: ['./trusted-by.component.scss'],
})
export class TrustedByComponent {
  readonly logos: BrandLogo[] = [
    { name: 'BrightForge', tagline: 'Product Engineering' },
    { name: 'Northwind', tagline: 'Financial Services' },
    { name: 'SkyLayer', tagline: 'Cloud Platforms' },
    { name: 'QuantumPeak', tagline: 'AI Research' },
    { name: 'ApexLabs', tagline: 'Health Tech' },
  ];
}
