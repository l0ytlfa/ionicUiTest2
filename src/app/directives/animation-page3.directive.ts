/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */

import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';
import { AnimationController, GestureController } from '@ionic/angular';

interface rgbResult {
  r: number;
  g: number;
  b: number;
}

@Directive({
  selector: '[appAnimationPage3]'
})

export class AnimationPage3Directive implements AfterViewInit {

  @Input() headerTextRef: any;
  @Input() headerRef: any;      //<-- master top header
  @Input() fabLeft1: any;       //<-- FAB header
  @Input() fabRight1: any;      //<-- FAB header
  @Input() fabRight2: any;      //<-- FAB header
  @Input() fabRight3: any;      //<-- FAB header
  @Input() bottomFab: any;      //<-- FAB bottom (reveal)
  @Input() content: any;        //<-- master content reference
  @Input() spacer: any;         //<-- initial space for scroll list
  @Input() swiperRef: any;


  spacerHeight: number;
  lastScrollOffset: number;
  subHeaderStartTop: number;
  prevIonTabBarHeight: number;
  fabLeft1Rgb: rgbResult;
  fabRight1Rgb: rgbResult;
  fabRight2Rgb: rgbResult;
  bottomFabVisible: boolean = false;
  stopFooterMovement: boolean = false;   //<--- TODO
  scrollElement: any;
  endOfPage: boolean = false;
  imageHeight: number;

  ionTabs: any;

  constructor(private element: ElementRef, private domCtrl: DomController, private animationCtrl: AnimationController
    , private gestureCtrl: GestureController, private renderer: Renderer2) {
    //--> just injection
  }

  @HostListener('ionScroll', ['$event']) async onContentScroll(ev: any) {

    if (this.scrollElement === undefined) {
      this.scrollElement = await ev.target.getScrollElement();
    }

    //--> check if end of the scroll 
    const scrollHeight = this.scrollElement.scrollHeight - this.scrollElement.clientHeight;
    if (this.scrollElement.scrollTop >= scrollHeight) {
      this.endOfPage = true;
    } else {
      this.endOfPage = false;
    }


    this.animateOnScroll(ev.detail.currentY);

    //--> show / hide bottom FAB
    if (this.lastScrollOffset > 0) {

      if (ev.detail.currentY > this.lastScrollOffset && ev.detail.currentY > 350 && this.bottomFabVisible === false && this.stopFooterMovement === false && this.endOfPage === false) {

        const an1 = this.animationCtrl.create()
          .addElement(this.ionTabs)
          .duration(160)
          .to('height', '0px').onFinish(() => {

            //--> show FAB after bar disapperar
            this.animationCtrl.create()
              .addElement(this.bottomFab.el)
              .duration(250)
              .to('transform', 'translate3d(0,0,0)').play();
          }).play();

        this.bottomFabVisible = true;

      } else if (ev.detail.currentY < this.lastScrollOffset && this.bottomFabVisible === true) {

        const an1 = this.animationCtrl.create()
          .addElement(this.ionTabs)
          .duration(160)
          .to('height', this.prevIonTabBarHeight + 'px').play();

        //--> hide FAB immediately
        this.animationCtrl.create()
          .addElement(this.bottomFab.el)
          .duration(1)
          .to('transform', 'translate3d(100px,0,0)').play();

        this.bottomFabVisible = false;

      }
    }

    this.lastScrollOffset = ev.detail.currentY;
  }

  animateOnScroll(scrollTop) {

    let imageMoveUp;
    let imagescaleDown;
    let imageOpacity;
    let masterHeaderOpacity;
    let moveWidth;
    let bagseMoverOpacity;
    let fabButtonsFade;
    let fabButtonMove;
    let masterHeaderTextOpacity;
    let imageTextOpacity;
    let imageTextUp;
    let masterHeader3d;

    //--> get original heights
    if (this.imageHeight === undefined) {
      this.imageHeight = this.swiperRef.offsetHeight;
    }

    if (this.spacerHeight === undefined) {
      this.spacerHeight = this.spacer.offsetHeight;
    }

    if (this.prevIonTabBarHeight === undefined) {
      const cs = getComputedStyle(this.ionTabs);
      this.prevIonTabBarHeight = this.ionTabs.clientHeight - parseInt(cs.paddingBottom, 10);
    }

    //--> get original colors from fab buttons
    if (this.fabLeft1Rgb === undefined) {
      let color = this.fabLeft1.color;
      if (color === undefined) {
        color = 'primary';
      }
      this.fabLeft1Rgb = this.hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--ion-color-' + color).trim());
    }


    if (scrollTop >= 0) {

      //--> master category image
      imageMoveUp = -this.easeLinear(scrollTop, 0, this.imageHeight / 3.5, 300);
      fabButtonMove = this.easeLinear(scrollTop, 17, 3.7, 200);
      imagescaleDown = 1;
      imageOpacity = this.easeLinear(scrollTop, 100, 0, 200);

      masterHeaderOpacity = this.easeLinear(scrollTop, 0, 100, 550, 180);
      masterHeaderTextOpacity = this.easeLinear(scrollTop, 0, 100, 700, 450);

      moveWidth = this.easeLinear(scrollTop, 0, 7.5, 400, 300);
      bagseMoverOpacity = this.easeLinear(scrollTop, 0, 100, 400, 300);

      fabButtonsFade = this.easeLinear(scrollTop, 1, 0, 80, 10);
      imageTextOpacity = this.easeLinear(scrollTop, 100, 0, 150, 20);
      imageTextUp = this.easeLinear(scrollTop, 33, 70, 150, 0);

      masterHeader3d = this.easeLinear(scrollTop, 1, 0.9, 70, 0);

    } else {

      //--> only in iOS: drag down the scroll 
      imageMoveUp = 0;
      fabButtonMove = 17;
      imagescaleDown = this.easeLinear(-scrollTop, 1, 2.5, 300);
      imageOpacity = 100;
      moveWidth = 0;
      imageTextUp = 33;
      bagseMoverOpacity = 0;
      fabButtonsFade = 100;
      imageTextOpacity = 100;

      masterHeaderOpacity = 0;
      masterHeaderTextOpacity = 0;

      masterHeader3d = this.easeLinear(-scrollTop, 1, 2.5, 300);;
    }

    //---> patch DOM
    this.domCtrl.write(() => {

      //--> fab buttons fade
      this.renderer.setStyle(this.fabLeft1.el, `--background`, this.getRgbString(this.fabLeft1Rgb, fabButtonsFade), 2);
      this.renderer.setStyle(this.fabRight1.el, `top`, fabButtonMove + 'em');
      this.renderer.setStyle(this.fabRight2.el, `top`, fabButtonMove + 'em');

      this.renderer.setStyle(this.swiperRef, 'opacity', imageOpacity + '%');
      this.renderer.setStyle(this.fabRight3.el, 'opacity', imageOpacity + '%');

      this.renderer.setStyle(this.headerRef.el, 'opacity', masterHeaderOpacity + '%');
      this.renderer.setStyle(this.headerTextRef, 'opacity', masterHeaderTextOpacity + '%');

      this.animationCtrl.create()
        .addElement(this.swiperRef)
        .to('transform', 'scale3d(' + masterHeader3d + ',' + masterHeader3d + ',1) '+'translate3d(0,' + imageMoveUp + 'px,0)')
        .duration(100).play();

    });

  }

  ngAfterViewInit() {
    //--> reference to master tabs
    this.ionTabs = document.querySelector('ion-tab-bar');
  }


  //------------------------------------> Utilities functions

  getRgbString(rgbObject: rgbResult, opacity: number): string {
    return 'rgb(' + this.fabLeft1Rgb.r + ',' + this.fabLeft1Rgb.g + ',' + this.fabLeft1Rgb.b + ',' + opacity + ')';
  }

  hexToRgb(hex): rgbResult {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  easeLinear(actualTime, originalValue, targetValue, totalTime, initialCutoff = 0) {

    if (actualTime < initialCutoff) {
      return originalValue;
    }

    //--> internal shift values
    const internalActualTime = actualTime - initialCutoff;
    const internalTotalTime = totalTime - initialCutoff;

    if (actualTime > totalTime) {
      return targetValue;
    }

    const c: number = targetValue - originalValue;
    return (c * internalActualTime / internalTotalTime + originalValue).toFixed(2);
  }

}
