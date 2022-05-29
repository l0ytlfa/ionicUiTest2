import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import {DetailpopupPage} from '../detailpopup/detailpopup/detailpopup.page';
import {popupEnterAnimation} from '../detailpopup/detailpopup/popoveranimation';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  items: any[] = [];

  constructor(private modalCtrl: ModalController) {
    for(let idx=1;idx<200;idx++){
      this.items.push({r1:'title here! '+idx,r2:'sub title here',r3:'description is long thing'});
    }
  }

  onListItemClick($event){
    const cr = $event.currentTarget.childNodes[0].getClientRects()[0];  //<-- get image ref

    this.modalCtrl.create({
      component: DetailpopupPage,
      enterAnimation: popupEnterAnimation,
      componentProps: {
        coords:{
          x: cr.x,
          y: cr.y,
          w: cr.width,
          h: cr.height
        }
      }
    }).then((modal)=>{
      modal.present();
    });

  }

}
