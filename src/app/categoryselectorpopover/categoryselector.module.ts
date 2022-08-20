import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryselectorPageRoutingModule } from './categoryselector-routing.module';

import { CategoryselectorPage } from './categoryselector.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryselectorPageRoutingModule,
    SwiperModule
  ],
  declarations: [CategoryselectorPage]
})
export class CategoryselectorPageModule {}
