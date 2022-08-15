import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailspecialPageRoutingModule } from './detailspecial-routing.module';

import { DetailspecialPage } from './detailspecial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailspecialPageRoutingModule
  ],
  declarations: [DetailspecialPage]
})
export class DetailspecialPageModule {}
