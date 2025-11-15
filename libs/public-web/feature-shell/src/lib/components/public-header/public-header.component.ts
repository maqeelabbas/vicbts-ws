import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ConfigService } from '@vicbts/shared/data-access/config';
import { NavItem } from '@vicbts/shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-public-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.scss'],
})
export class PublicHeaderComponent implements OnInit {
  private configService = inject(ConfigService);

  isMenuOpen = false;
  navItems$: Observable<NavItem[]> = this.configService.navItems$;
  appName = '';
  logoUrl = '';

  ngOnInit(): void {
    this.configService.config$.subscribe((config) => {
      if (config) {
        this.appName = config.appName;
        this.logoUrl = config.logoUrl;
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
