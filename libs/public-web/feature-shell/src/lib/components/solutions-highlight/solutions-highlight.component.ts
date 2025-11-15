import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface HighlightPoint {
  title: string;
  description: string;
}

@Component({
  selector: 'lib-solutions-highlight',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './solutions-highlight.component.html',
  styleUrls: ['./solutions-highlight.component.scss'],
})
export class SolutionsHighlightComponent {
  readonly highlightPoints: HighlightPoint[] = [
    {
      title: 'Modern Angular platforms',
      description: 'Composable architecture, Nx tooling, and shared libraries built for rapid iteration.',
    },
    {
      title: 'Customer-centric UX research',
      description: 'Workshops, journey mapping, and collaborative prototyping keep teams aligned on outcomes.',
    },
    {
      title: 'Integrated delivery squads',
      description: 'Cross-functional teams cover strategy, UI/UX, development, QA, and DevOps from day one.',
    },
  ];
}
