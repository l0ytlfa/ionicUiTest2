import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryselectorPage } from './categoryselector.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryselectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryselectorPageRoutingModule {}
