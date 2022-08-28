import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { AnimationPage1Directive } from '..//directives/animation-page1.directive';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LottieModule } from 'ngx-lottie';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    LottieModule
  ],
  declarations: [Tab1Page,AnimationPage1Directive],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class Tab1PageModule {}
