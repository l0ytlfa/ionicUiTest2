import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailpopupPageRoutingModule } from './detailpopup-routing.module';

import { DetailpopupPage } from './detailpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailpopupPageRoutingModule
  ],
  declarations: [DetailpopupPage]
})
export class DetailpopupPageModule {}
