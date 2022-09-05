/* eslint-disable @typescript-eslint/naming-convention */
import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

import { DetailspecialPage } from '../detailspecial/detailspecial.page';
import { popupEnterAnimation } from '../detailspecial/popoveranimation';

import { CategoryselectorPage } from '../categoryselectorpopover/categoryselector.page';
import { popupEnterAnimation as selectorAnimation } from '../categoryselectorpopover/popoveranimation';

import { CategoryselectopopoverwidePage } from '../categoryselectopopoverwide/categoryselectopopoverwide.page';
import { popupEnterAnimation as selectorPopoverWideAnimation } from '../categoryselectopopoverwide/popoveranimation';
import { popupExitAnimation as selectorPopoverWideAnimationExit } from '../categoryselectopopoverwide/popoveranimationExit';

import { PopupnewsPage } from '../popupnews/popupnews.page';
import { popupEnterAnimation as newsAnimation } from '../popupnews/popovernewsanimation';

import { PopupnewsstaticPage } from '../popupnewsstatic/popupnewsstatic.page';
import { popupEnterAnimation as newsstaticAnimation } from '../popupnewsstatic/popovernewsstaticanimation';
import { popupEnterAnimation as newsstaticExitAnimation } from '../popupnewsstatic/popovernewsstaticExitanimation';

import { ToastanimationPage } from '../toastanimation/toastanimation.page';
import { popupEnterAnimation as toastAnimation } from '../toastanimation/popoveranimation';
import { popupExitAnimation as toastExitAnimation } from '../toastanimation/popoveranimationExit';
import { SwiperOptions } from 'swiper/types';
import { StyleService } from '../otherclasses/styleservice';

// import Swiper core and required modules
import SwiperCore, { FreeMode, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([FreeMode, Pagination]);

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit, AfterContentInit {

  @ViewChild('cnt') CNT: any;
  @ViewChild('SWP') SWP: any;


  items: any[] = [];
  scrollElement: any;
  cnter: number = 0;

  swiperParams: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
  };

  constructor(private modalCtrl: ModalController, public popoverController: PopoverController, private styleService: StyleService) {
    for (let idx = 1; idx < 200; idx++) {
      this.items.push({ r1: 'Sashimi ', r2: 'gustosi e convenienti', r3: 'description is long thing' });
    }
  }
  ngAfterContentInit(): void {

  }
  ngOnInit(): void {
    document.documentElement.style.setProperty('--deltax', '0px');
  }

  ngAfterViewInit() {

  }

  //-->long press dialog
  async onListItemClick($event) {
    const cr = $event.currentTarget.childNodes[0].getClientRects()[0];  //<-- get image ref

    //--> get scroll container of parent
    this.scrollElement = await this.CNT.getScrollElement();

    this.modalCtrl.create({
      component: DetailspecialPage,
      enterAnimation: popupEnterAnimation,
      componentProps: {
        coords: {
          x: cr.x,
          y: cr.y,
          w: cr.width,
          h: cr.height,
          clientHeight: this.scrollElement.clientHeight,
          itemY: $event.currentTarget.getBoundingClientRect().y,
          outContainer: this.CNT.el.parentElement.parentElement.parentElement
        }
      }
    }).then((modal) => {
      modal.present();
    });

  }


  //--> category selector dialog
  async gotoselector($event) {

    const popover = await this.popoverController.create({
      component: CategoryselectopopoverwidePage,
      event: $event,
      showBackdrop: true,
      animated: true,
      enterAnimation: selectorPopoverWideAnimation,
      leaveAnimation: selectorPopoverWideAnimationExit,
      //cssClass: 'popoverBackDropWide',
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

  async gotonewsstatic($event) {

    this.modalCtrl.create({
      component: PopupnewsstaticPage,
      enterAnimation: newsstaticAnimation,
      leaveAnimation: newsstaticExitAnimation,
      animated: true
    }).then((modal) => {
      modal.present();
    });

  }

  async gotonews($event) {

    this.modalCtrl.create({
      component: PopupnewsPage,
      enterAnimation: newsAnimation,
      cssClass: 'popoverBackDrop'
    }).then((modal) => {
      modal.present();
    });

  }

  //-----------------------------------------------------------------------

  internalSelectSlide(idx: number) {

    let swpr = this.SWP.swiperRef;
    let swprEl = this.SWP.elementRef.nativeElement;

    var el = swprEl.querySelector('.baseMovingTile');
    if (el !== null) {

      let br = el.getBoundingClientRect();
      let tbr = swpr.slides[idx].getBoundingClientRect();

      let delta = br.x - tbr.x;
      document.documentElement.style.setProperty('--deltax', delta + 'px');
      document.documentElement.style.setProperty('--widthstart', (br.width - parseInt(window.getComputedStyle(el).marginRight)) + 'px');
      document.documentElement.style.setProperty('--widthend', (tbr.width - parseInt(window.getComputedStyle(swpr.slides[idx]).marginRight)) + 'px');


      el.classList.remove('baseMovingTile');
      swpr.slides[idx].classList.add('movingTile');

      el.classList.add('zindex999');
      swpr.slides[idx].classList.remove('zindex999');

    } else {

      let el = swprEl.querySelector('.movingTile');

      let br = el.getBoundingClientRect();
      let tbr = swpr.slides[idx].getBoundingClientRect();

      let delta = br.x - tbr.x;
      document.documentElement.style.setProperty('--deltax', delta + 'px');
      document.documentElement.style.setProperty('--widthstart', (br.width - parseInt(window.getComputedStyle(el).marginRight)) + 'px');
      document.documentElement.style.setProperty('--widthend', (tbr.width - parseInt(window.getComputedStyle(swpr.slides[idx]).marginRight)) + 'px');


      el.classList.remove('movingTile');
      swpr.slides[idx].classList.add('movingTile');

      el.classList.add('zindex999');
      swpr.slides[idx].classList.remove('zindex999');

    }

    swpr.slideTo(idx);

  }

  //---> click slide select
  clickSlide(event) {

    var el = event[0].$wrapperEl[0].querySelector('.baseMovingTile');
    if (el !== null) {

      let br = el.getBoundingClientRect();
      let tbr = event[0].slides[event[0].clickedIndex].getBoundingClientRect();

      let delta = br.x - tbr.x;
      document.documentElement.style.setProperty('--deltax', delta + 'px');
      document.documentElement.style.setProperty('--widthstart', (br.width - parseInt(window.getComputedStyle(el).marginRight)) + 'px');
      document.documentElement.style.setProperty('--widthend', (tbr.width - parseInt(window.getComputedStyle(event[0].slides[event[0].clickedIndex]).marginRight)) + 'px');


      el.classList.remove('baseMovingTile');
      event[0].slides[event[0].clickedIndex].classList.add('movingTile');

      el.classList.add('zindex999');
      event[0].slides[event[0].clickedIndex].classList.remove('zindex999');

    } else {

      let el = event[0].$wrapperEl[0].querySelector('.movingTile');

      let br = el.getBoundingClientRect();
      let tbr = event[0].slides[event[0].clickedIndex].getBoundingClientRect();

      let delta = br.x - tbr.x;
      document.documentElement.style.setProperty('--deltax', delta + 'px');
      document.documentElement.style.setProperty('--widthstart', (br.width - parseInt(window.getComputedStyle(el).marginRight)) + 'px');
      document.documentElement.style.setProperty('--widthend', (tbr.width - parseInt(window.getComputedStyle(event[0].slides[event[0].clickedIndex]).marginRight)) + 'px');


      el.classList.remove('movingTile');
      event[0].slides[event[0].clickedIndex].classList.add('movingTile');

      el.classList.add('zindex999');
      event[0].slides[event[0].clickedIndex].classList.remove('zindex999');

    }

    event[0].slideTo(event[0].clickedIndex);
  }

  gototoast($event) {

    this.internalSelectSlide(2);

    return;

    this.modalCtrl.create({
      component: ToastanimationPage,
      enterAnimation: toastAnimation,
      leaveAnimation: toastExitAnimation,
      //cssClass: 'popoverBackDropDarker'
    }).then((modal) => {
      modal.present();
    });

  }

  onSlideChange($event) {


    console.log('RI>>> ' + $event[0].activeIndex + ' PI>>> ' + $event[0].previousIndex);

    // previousIndex: 0   activeIndex
    //$event[0].slides[0].children[0].getBoundingClientRect() 
    let deltaX = $event[0].slides[$event[0].realIndex].children[0].getBoundingClientRect().x - $event[0].slides[$event[0].previousIndex].children[0].getBoundingClientRect().x;

    let css = this.styleService.cssStyleSheet;

    //debugger;

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
