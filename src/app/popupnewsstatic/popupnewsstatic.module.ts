import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopupnewsstaticPageRoutingModule } from './popupnewsstatic-routing.module';

import { PopupnewsstaticPage } from './popupnewsstatic.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopupnewsstaticPageRoutingModule,
    SwiperModule
  ],
  declarations: [PopupnewsstaticPage]
})
export class PopupnewsstaticPageModule {}
