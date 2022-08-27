import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryselectopopoverwidePageRoutingModule } from './categoryselectopopoverwide-routing.module';

import { CategoryselectopopoverwidePage } from './categoryselectopopoverwide.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryselectopopoverwidePageRoutingModule
  ],
  declarations: [CategoryselectopopoverwidePage]
})
export class CategoryselectopopoverwidePageModule {}
