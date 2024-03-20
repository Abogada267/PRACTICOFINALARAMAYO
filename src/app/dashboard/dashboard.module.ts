import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { adminGuard } from '../../app/core/guards/admin.guard';
import { UserDetailComponent } from '../../app/layout/pages/users/pages/user-detail/user-detail.component';
import { UsersModule } from '../../app/layout/pages/users/users.module';
import { CategoriesModule } from '../layout/pages/pages/categories/categories.module';
import { HomeComponent } from '../layout/pages/pages/home/home.component';
import { PipesModule } from '../layout/pages/pages/pipes/pipes.module';
import { RxjsExampleModule } from '../layout/pages/pages/rxjs-example/rxjs-example.module';
import { RxjsIntroduccionModule } from '../layout/pages/pages/rxjs-introduccion/rxjs-introduccion.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    UsersModule,
    CategoriesModule,
    PipesModule,
    RxjsExampleModule,
    RxjsIntroduccionModule,
    MatListModule,
    MatDrawerContainer,
    RouterOutlet,
     RouterModule.forChild([
      {
               path: 'home',
        component: HomeComponent,
      },
      {
        // /dashboard/users
        path: 'users',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('../layout/pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        
        path: 'products',
        loadChildren: () =>
          import('../layout/pages/pages/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        // /dashboard/clase-16
        path: 'clase-16',
        loadChildren: () =>
          import('../../app/layout/pages/pages/clase-16-redux/clase-16-redux.module').then(
            (m) => m.Clase16ReduxModule
          ),
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('../../app/layout/pages/pages/sales/sales.module').then((m) => m.SalesModule),
      },
      {
        path: 'users/:id',
        component: UserDetailComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ]),
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}