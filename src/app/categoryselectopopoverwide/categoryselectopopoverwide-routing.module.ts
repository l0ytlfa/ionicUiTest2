import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryselectopopoverwidePage } from './categoryselectopopoverwide.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryselectopopoverwidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryselectopopoverwidePageRoutingModule {}
