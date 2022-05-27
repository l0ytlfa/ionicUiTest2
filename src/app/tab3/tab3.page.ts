import { Component } from '@angular/core';
import SwiperCore, { Pagination } from 'swiper';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  slideOpts: any;
  pagination: object;

  constructor() {

    this.pagination = {
      clickable: true,
      renderBullet: (index, className)=> '<span class="' + className + '" style="background:white;"></span>'
    };

  }

}
