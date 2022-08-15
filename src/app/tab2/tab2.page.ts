import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

import {DetailspecialPage} from '../detailspecial/detailspecial.page';
import {popupEnterAnimation} from '../detailspecial/popoveranimation';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('cnt') CNT: any;
  

  items: any[] = [];
  scrollElement: any;

  constructor(private modalCtrl: ModalController) {
    for(let idx=1;idx<200;idx++){
      this.items.push({r1:'title here! '+idx,r2:'sub title here',r3:'description is long thing'});
    }
  }

  async onListItemClick($event){
    const cr = $event.currentTarget.childNodes[0].getClientRects()[0];  //<-- get image ref

    //--> get scroll container of parent
    this.scrollElement = await this.CNT.getScrollElement();

    this.modalCtrl.create({
      component: DetailspecialPage,
      enterAnimation: popupEnterAnimation,
      componentProps: {
        coords:{
          x: cr.x,
          y: cr.y,
          w: cr.width,
          h: cr.height,
          clientHeight: this.scrollElement.clientHeight,
          itemY: $event.currentTarget.getBoundingClientRect().y,
          outContainer: this.CNT
        }
      }
    }).then((modal)=>{
      modal.present();
    });

  }

}
