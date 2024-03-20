import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from './router/rutas';

@NgModule({
  imports: [RouterModule.forRoot(Routes.getRoutes())],
  exports: [RouterModule],
})
export class AppRoutingModule {}
