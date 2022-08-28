/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ViewChild } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

import {DetailspecialPage} from '../detailspecial/detailspecial.page';
import {popupEnterAnimation} from '../detailspecial/popoveranimation';

import {CategoryselectorPage} from '../categoryselectorpopover/categoryselector.page';
import {popupEnterAnimation as selectorAnimation} from '../categoryselectorpopover/popoveranimation';

import {CategoryselectopopoverwidePage} from '../categoryselectopopoverwide/categoryselectopopoverwide.page';
import {popupEnterAnimation as selectorPopoverWideAnimation} from '../categoryselectopopoverwide/popoveranimation';

import {PopupnewsPage} from '../popupnews/popupnews.page';
import {popupEnterAnimation as newsAnimation} from '../popupnews/popovernewsanimation';

import {PopupnewsstaticPage} from '../popupnewsstatic/popupnewsstatic.page';
import {popupEnterAnimation as newsstaticAnimation} from '../popupnewsstatic/popovernewsstaticanimation';
import {popupEnterAnimation as newsstaticExitAnimation} from '../popupnewsstatic/popovernewsstaticExitanimation';

import {ToastanimationPage} from '../toastanimation/toastanimation.page';
import {popupEnterAnimation as toastAnimation} from '../toastanimation/popoveranimation';
import {popupExitAnimation as toastExitAnimation} from '../toastanimation/popoveranimationExit';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('cnt') CNT: any;

  items: any[] = [];
  scrollElement: any;

  constructor(private modalCtrl: ModalController, public popoverController: PopoverController) {
    for(let idx=1;idx<200;idx++){
      this.items.push({r1:'title here! '+idx,r2:'sub title here',r3:'description is long thing'});
    }
  }


  //-->long press dialog
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
          outContainer: this.CNT.el.parentElement.parentElement.parentElement
        }
      }
    }).then((modal)=>{
      modal.present();
    });

  }


  //--> category selector dialog
  async gotoselector($event){

    const popover = await this.popoverController.create({
      component: CategoryselectopopoverwidePage,
      event: $event,
      showBackdrop: true,
      animated: true,
      enterAnimation: selectorPopoverWideAnimation,
      cssClass: 'popoverBackDropWide',
      size: 'auto'
    });

    await popover.present();

    /*
    //---> top most popover
    const popover = await this.popoverController.create({
      component: CategoryselectorPage,
      event: $event,
      showBackdrop: true,
      animated: true,
      enterAnimation: selectorAnimation,
      cssClass: 'popoverBackDrop'
    });

    await popover.present();
    */

  }

  async gotonewsstatic($event){

    this.modalCtrl.create({
      component: PopupnewsstaticPage,
      enterAnimation: newsstaticAnimation,
      leaveAnimation: newsstaticExitAnimation,
      //cssClass: 'popoverBackDropDarker',
      animated: true
    }).then((modal)=>{
      modal.present();
    });

  }

  async gotonews($event){

    this.modalCtrl.create({
      component: PopupnewsPage,
      enterAnimation: newsAnimation,
      cssClass: 'popoverBackDrop'
    }).then((modal)=>{
      modal.present();
    });

  }

  async gototoast($event){

    this.modalCtrl.create({
      component: ToastanimationPage,
      enterAnimation: toastAnimation,
      leaveAnimation: toastExitAnimation,
      //cssClass: 'popoverBackDropDarker'
    }).then((modal)=>{
      modal.present();
    });

  }
/*    const cr = $event.currentTarget.childNodes[0].getClientRects()[0];  //<-- get image ref

    //--> get scroll container of parent
    this.scrollElement = await this.CNT.getScrollElement();

    this.modalCtrl.create({
      component: CategoryselectorPage,
      enterAnimation: selectorAnimation,
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
    });*/
  

}
