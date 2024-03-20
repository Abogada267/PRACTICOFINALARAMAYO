import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { DashboardComponent } from '../../app/dashboard/dashboard.component';
import { DashboardModule } from '../../app/dashboard/dashboard.module';
import { LoginComponent } from '../layout/auth/auth/pages/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class Routes {
  static routes: Route[] = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    
    {
      path: 'dashboard',
      component: DashboardComponent,
      loadChildren: () => DashboardModule 
    },
    { path: '**', redirectTo: '/not-found' }, 
  ];

  public static getRoutes(): Route[] {
    return Routes.routes;
  }
}
