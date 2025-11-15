import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query } from '@angular/animations';
import { PublicHeaderComponent } from '../components/public-header/public-header.component';
import { PublicFooterComponent } from '../components/public-footer/public-footer.component';
import { ConfigService } from '@vicbts/shared/data-access/config';
import { ThemeVariableService } from '@vicbts/shared/ui';

@Component({
  selector: 'lib-public-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PublicHeaderComponent,
    PublicFooterComponent,
  ],
  templateUrl: './public-shell.component.html',
  styleUrls: ['./public-shell.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true })
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class PublicShellComponent implements OnInit {
  private configService = inject(ConfigService);
  private themeService = inject(ThemeVariableService);

  isThemeLoaded = false;

  ngOnInit(): void {
    this.configService.theme$.subscribe((theme) => {
      if (theme) {
        this.themeService.applyTheme(theme);
        this.isThemeLoaded = true;
      }
    });
  }
}
