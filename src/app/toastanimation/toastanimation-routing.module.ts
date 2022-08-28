import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToastanimationPage } from './toastanimation.page';

const routes: Routes = [
  {
    path: '',
    component: ToastanimationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToastanimationPageRoutingModule {}
