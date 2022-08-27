import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

import { PopupnewsPageRoutingModule } from './popupnews-routing.module';

import { PopupnewsPage } from './popupnews.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopupnewsPageRoutingModule,
    SwiperModule
  ],
  declarations: [PopupnewsPage]
})
export class PopupnewsPageModule {}
