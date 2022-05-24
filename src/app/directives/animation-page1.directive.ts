/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
import { AfterViewChecked, AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';
import { AnimationController, Gesture, GestureController } from '@ionic/angular';

interface rgbResult {
  r: number;
  g: number;
  b: number;
}

@Directive({
  selector: '[appAnimationPage1]'
})
export class AnimationPage1Directive implements AfterViewInit {

  @Input() headerRef: any;      //<-- master top header
  @Input() headerRef2: any;     //<-- sub top header

  @Input() fabLeft1: any;       //<-- FAB header
  @Input() fabRight1: any;      //<-- FAB header
  @Input() fabRight2: any;      //<-- FAB header
  @Input() bottomFab: any;      //<-- FAB bottom (reveal)
  @Input() chip: any;           //<-- location chip
  @Input() content: any;        //<-- master content reference
  @Input() spacer: any;         //<-- initial space for scroll list
  @Input() imgHeader: any;      //<-- image in primary header


  spacerHeight: number;
  lastScrollOffset: number;
  subHeaderStartTop: number;
  prevIonTabBarHeight: number;
  fabLeft1Rgb: rgbResult;
  fabRight1Rgb: rgbResult;
  fabRight2Rgb: rgbResult;
  bottomFabVisible: boolean = false;
  stopFooterMovement: boolean = false;   //<--- TODO

  ionTabs: any;

  constructor(private element: ElementRef, private domCtrl: DomController, private animationCtrl: AnimationController
    , private gestureCtrl: GestureController, private renderer: Renderer2) {
    //--> just injection
  }

  @HostListener('ionScroll', ['$event']) onContentScroll(ev: any) {
    this.animateOnScroll(ev.detail.currentY);

    //--> show / hide bottom FAB
    if (this.lastScrollOffset > 0) {

      if (ev.detail.currentY > this.lastScrollOffset && ev.detail.currentY > 350 && this.bottomFabVisible === false && this.stopFooterMovement === false) {

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

    let masterHeaderOpacity;
    let fabButtonsFade;
    let subHeaderPosition;
    let masterHeaderOpacity2;
    let chipPosition;
    let fabButtonPosition;
    let transalteHeaderImage;
    let chipBackTrasparency;


    if (this.spacerHeight === undefined) {
      this.spacerHeight = this.spacer.offsetHeight;
    }

  
    if (this.subHeaderStartTop === undefined) {
      this.subHeaderStartTop = this.headerRef2.el.getClientRects()[0].y;
    }

    if (this.prevIonTabBarHeight === undefined) {
      const cs = getComputedStyle(this.ionTabs);
      this.prevIonTabBarHeight = this.ionTabs.clientHeight - parseInt(cs.paddingBottom, 10);
    }

    

    if (scrollTop >= 0) {

      //--> master category image
      masterHeaderOpacity = this.easeLinear(scrollTop, 100, 0, 250, 0);
      masterHeaderOpacity2 = this.easeLinear(scrollTop, 100, 0, 50, 0);
      subHeaderPosition = this.easeLinear(scrollTop, this.subHeaderStartTop, 0, 250, 20);
      chipPosition = this.easeLinear(scrollTop, 8, 2.5, 250, 20);
      fabButtonsFade = this.easeLinear(scrollTop, 1, 0, 80, 10);
      fabButtonPosition = this.easeLinear(scrollTop, 6, 1.3, 250, 20);
      transalteHeaderImage = this.easeLinear(scrollTop,0,200,500);
      chipBackTrasparency = this.easeLinear(scrollTop,1,0.13,400,20);

    } else {

      //--> only in iOS: drag down the scroll 
      fabButtonsFade = 100;
      masterHeaderOpacity = 100;
      subHeaderPosition = 0;
      transalteHeaderImage = 0;
      chipBackTrasparency = 1;
      chipPosition = 8;
      subHeaderPosition = this.subHeaderStartTop;
      
    }

    //---> patch DOM
    this.domCtrl.write(() => {

      this.renderer.setStyle(this.headerRef.el, 'opacity', masterHeaderOpacity + '%');
      this.renderer.setStyle(this.fabRight2.el, 'opacity', masterHeaderOpacity2 + '%');

      this.renderer.setStyle(this.fabLeft1.el, 'top', fabButtonPosition + 'em');
      this.renderer.setStyle(this.fabRight1.el, 'top', fabButtonPosition + 'em');
      this.renderer.setStyle(this.headerRef2.el, 'top', subHeaderPosition + 'px');
      this.renderer.setStyle(this.chip.el, 'top', chipPosition + 'em');
      this.renderer.setStyle(this.chip.el, 'background-color', 'rgb(0,0,0,'+chipBackTrasparency+')');

      this.renderer.setStyle(this.imgHeader.el, 'transform', 'translate3d(-'+transalteHeaderImage + 'px,0,0)');

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
