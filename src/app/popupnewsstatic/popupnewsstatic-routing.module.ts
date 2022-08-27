import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopupnewsstaticPage } from './popupnewsstatic.page';

const routes: Routes = [
  {
    path: '',
    component: PopupnewsstaticPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopupnewsstaticPageRoutingModule {}
