import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-v-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './v-card.component.html',
  styleUrls: ['./v-card.component.scss'],
})
export class VCardComponent {
  @Input() title = '';
  @Input() subtitle = '';
}
