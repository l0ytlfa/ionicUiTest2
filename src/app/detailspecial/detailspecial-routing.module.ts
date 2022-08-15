import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailspecialPage } from './detailspecial.page';

const routes: Routes = [
  {
    path: '',
    component: DetailspecialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailspecialPageRoutingModule {}
