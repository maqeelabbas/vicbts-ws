import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-v-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './v-button.component.html',
  styleUrls: ['./v-button.component.scss'],
})
export class VButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() fullWidth = false;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
