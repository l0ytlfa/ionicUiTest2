import { Component } from '@angular/core';
import SwiperCore, { Pagination , EffectCreative } from 'swiper';

SwiperCore.use([Pagination, EffectCreative]);

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  slideOpts: any;
  pagination: object;
  effectSlider: object;

  constructor() {

    this.pagination = {
      clickable: true,
      renderBullet: (index, className)=> '<span class="' + className + '" style="background:white;"></span>'
    };

    //--> slide over effect
    this.effectSlider = {
      prev: {
        shadow: true,
        translate: ['-20%', 0, -1]
      },
      next: {
        translate: ['100%', 0, 0]
      }
    };

    /*this.effectSlider = {
      prev: {
        shadow: true,
        translate: [0, 0, -400]
      },
      next: {
        translate: ['100%', 0, 0]
      }
    };*/

  }

}
