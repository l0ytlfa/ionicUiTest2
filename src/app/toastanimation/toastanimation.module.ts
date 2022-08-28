import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToastanimationPageRoutingModule } from './toastanimation-routing.module';

import { ToastanimationPage } from './toastanimation.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LottieModule } from 'ngx-lottie';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToastanimationPageRoutingModule,
    LottieModule
  ],
  declarations: [ToastanimationPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ToastanimationPageModule {}
