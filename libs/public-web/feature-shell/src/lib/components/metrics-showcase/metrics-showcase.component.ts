import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MetricItem {
  value: string;
  label: string;
  description: string;
}

@Component({
  selector: 'lib-metrics-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metrics-showcase.component.html',
  styleUrls: ['./metrics-showcase.component.scss'],
})
export class MetricsShowcaseComponent {
  readonly metrics: MetricItem[] = [
    {
      value: '120+',
      label: 'Product launches',
      description: 'Delivered across enterprise, fintech, and SaaS verticals with measurable ROI.',
    },
    {
      value: '98%',
      label: 'Client retention',
      description: 'Multi-year partnerships built on transparent communication and reliable delivery.',
    },
    {
      value: '4.9/5',
      label: 'Project satisfaction',
      description: 'Ratings gathered from retrospectives and stakeholder reviews across engagements.',
    },
    {
      value: '14 days',
      label: 'Average kickoff',
      description: 'From contract to sprint zero with design systems, CI/CD, and governance ready.',
    },
  ];
}
