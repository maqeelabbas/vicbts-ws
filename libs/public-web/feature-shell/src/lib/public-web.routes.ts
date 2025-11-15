import { Route } from '@angular/router';
import { PublicShellComponent } from './shell/public-shell.component';
import { HomeLandingPageComponent } from './pages/home-landing/home-landing-page.component';
import { ServicesPageComponent } from './pages/services/services-page.component';
import { ContactPageComponent } from './pages/contact/contact-page.component';
import { AboutPageComponent } from './pages/about-page.component';
import { DashboardPageComponent } from './pages/dashboard-page.component';
import { authGuard } from '@vicbts/shared/data-access/auth';

export const publicWebRoutes: Route[] = [
  {
    path: '',
    component: PublicShellComponent,
    children: [
      {
        path: '',
        component: HomeLandingPageComponent,
        title: 'Home - VicBts',
      },
      {
        path: 'services',
        component: ServicesPageComponent,
        title: 'Our Services - VicBts',
      },
      {
        path: 'contact',
        component: ContactPageComponent,
        title: 'Contact Us - VicBts',
      },
      {
        path: 'about',
        component: AboutPageComponent,
        title: 'About Us',
      },
      {
        path: 'dashboard',
        component: DashboardPageComponent,
        canActivate: [authGuard],
        title: 'Dashboard',
      },
    ],
  },
];
