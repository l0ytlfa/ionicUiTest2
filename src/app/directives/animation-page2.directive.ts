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
  selector: '[appAnimationPage2]'
})
export class AnimationPage2Directive implements AfterViewInit {

  @Input() imageRef: any;       //<-- top master image of category
  @Input() headerRef: any;      //<-- master top header
  @Input() headerTextRef: any;  //<-- text in header 
  @Input() barSearchRef: any;   //<-- top appearing search bar
  @Input() fabLeft1: any;       //<-- FAB header
  @Input() fabRight1: any;      //<-- FAB header
  @Input() fabRight2: any;      //<-- FAB header
  @Input() bottomFab: any;      //<-- FAB bottom (reveal)
  @Input() barProductsCat: any; //<-- products sub category bar
  @Input() vse: any;            //<-- vistual scroll viewport (cdk)
  @Input() content: any;        //<-- master content reference
  @Input() mover: any;          //<-- gripper to fast scroll
  @Input() moverBadge: any;     //<-- gripper to fast scroll
  @Input() imageText: any;

  @Input() spacer: any;         //<-- initial space for scroll list

  dragInMover: boolean = false;
  imageHeight: number;
  scrollDirection: string = '';
  lastScrollOffset: 0;
  startScrollPosition: 0;
  moverStartDragPos: 0;
  expandedHeader: boolean = false;
  spacerHeight: number;
  searchBarHeight: number;
  masterTopOffset: number;
  fabLeft1Rgb: rgbResult;
  fabRight1Rgb: rgbResult;
  fabRight2Rgb: rgbResult;
  prevIonTabBarHeight: number;
  bottomFabVisible: boolean = false;
  stopFooterMovement: boolean = false;

  ionTabs: any;

  constructor(private element: ElementRef, private domCtrl: DomController, private animationCtrl: AnimationController
    , private gestureCtrl: GestureController, private renderer: Renderer2) {
    //--> just injection
  }

  @HostListener('ionScroll', ['$event']) onContentScroll(ev: any) {
    //--> not used with Virtual scroll list
  }

  animateOnScroll(scrollTop) {

    let imageMoveUp;
    let imagescaleDown;
    let imageOpacity;
    let masterHeaderOpacity;
    let moveWidth;
    let bagseMoverOpacity;
    let fabButtonsFade;
    let masterHeaderTextOpacity;
    let imageTextOpacity;
    let imageTextUp;

    //--> get original heights
    if (this.imageHeight === undefined) {
      this.imageHeight = this.imageRef.offsetHeight;
      this.masterTopOffset = this.fabLeft1.el.getClientRects()[0].y;
    }

    if (this.spacerHeight === undefined) {
      this.spacerHeight = this.spacer.offsetHeight;
    }

    if (this.searchBarHeight === undefined) {
      this.searchBarHeight = this.barSearchRef.el.offsetHeight;
    }

    //--> get original colors from fab buttons
    if (this.fabLeft1Rgb === undefined) {
      let color = this.fabLeft1.color;
      if (color === undefined) {
        color = 'primary';
      }
      this.fabLeft1Rgb = this.hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--ion-color-' + color).trim());

      color = this.fabRight1.color;
      if (color === undefined) {
        color = 'primary';
      }
      this.fabRight1Rgb = this.hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--ion-color-' + color).trim());

      color = this.fabRight2.color;
      if (color === undefined) {
        color = 'primary';
      }
      this.fabRight2Rgb = this.hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--ion-color-' + color).trim());
    }



    if (scrollTop >= 0) {

      //--> master category image
      imageMoveUp = -this.easeLinear(scrollTop, 0, this.imageHeight / 3.5, 300);
      imagescaleDown = 1;
      imageOpacity = this.easeLinear(scrollTop, 100, 0, 200);

      masterHeaderOpacity = this.easeLinear(scrollTop, 0, 100, 550, 180);
      masterHeaderTextOpacity = this.easeLinear(scrollTop, 0, 100, 700, 450);

      moveWidth = this.easeLinear(scrollTop, 0, 7.5, 400, 300);
      bagseMoverOpacity = this.easeLinear(scrollTop, 0, 100, 400, 300);

      fabButtonsFade = this.easeLinear(scrollTop, 1, 0, 80, 10);
      imageTextOpacity = this.easeLinear(scrollTop, 100, 0, 150, 20);
      imageTextUp = this.easeLinear(scrollTop, 33, 70, 150, 0);

    } else {

      //--> only in iOS: drag down the scroll 
      imageMoveUp = 0;
      imagescaleDown = this.easeLinear(-scrollTop, 1, 2.5, 300);
      imageOpacity = 100;
      moveWidth = 0;
      imageTextUp = 33;
      bagseMoverOpacity = 0;
      fabButtonsFade = 100;
      imageTextOpacity = 100;

      masterHeaderOpacity = 0;
      masterHeaderTextOpacity = 0;
    }

    //---> patch DOM
    this.domCtrl.write(() => {

      //--> fab buttons fade
      this.renderer.setStyle(this.fabLeft1.el, `--background`, this.getRgbString(this.fabLeft1Rgb, fabButtonsFade), 2);
      this.renderer.setStyle(this.fabRight1.el, `--background`, this.getRgbString(this.fabRight1Rgb, fabButtonsFade), 2);
      this.renderer.setStyle(this.fabRight2.el, `--background`, this.getRgbString(this.fabRight2Rgb, fabButtonsFade), 2);

      this.renderer.setStyle(this.imageText, 'opacity', imageTextOpacity + '%');
      this.renderer.setStyle(this.imageText, 'bottom', imageTextUp + '%');


      this.renderer.setStyle(this.imageRef, 'opacity', imageOpacity + '%');
      this.renderer.setStyle(this.headerRef.el, 'opacity', masterHeaderOpacity + '%');
      this.renderer.setStyle(this.headerTextRef, 'opacity', masterHeaderTextOpacity + '%');

      this.renderer.setStyle(this.mover, 'width', moveWidth + '%');
      this.renderer.setStyle(this.moverBadge.el, 'opacity', bagseMoverOpacity + '%');


      //--> reveal / hide the top search bar
      if (this.scrollDirection === 'U' && this.startScrollPosition === 0) {

        const spacerH = this.searchBarHeight / 2 + this.imageHeight;
        const an1 = this.animationCtrl.create()
          .addElement(this.spacer)
          .to('height', spacerH + 'px')
          .easing('ease-in-out')
          .duration(100);

        const an2 = this.animationCtrl.create()
          .addElement(this.barSearchRef.el)
          .to('opacity', '100%')
          .easing('ease-in-out')
          .duration(150);

        const an3 = this.animationCtrl.create()
          .addElement(this.imageRef)
          .to('top', this.searchBarHeight + 'px')
          .easing('ease-in-out')
          .duration(100);

        const deltaTot = this.searchBarHeight / 1.8 + this.masterTopOffset;

        const an4 = this.animationCtrl.create()
          .addElement(this.fabLeft1.el.parentElement)
          .to('top', deltaTot + 'px')
          .easing('ease-in-out')
          .duration(100);

        const an5 = this.animationCtrl.create()
          .addElement(this.fabRight1.el.parentElement)
          .to('top', deltaTot + 'px')
          .easing('ease-in-out')
          .duration(100);

        const an6 = this.animationCtrl.create()
          .addElement(this.fabRight2.el.parentElement)
          .to('top', deltaTot + 'px')
          .easing('ease-in-out')
          .duration(100);

        this.animationCtrl.create()
          .addAnimation([an1, an2, an3, an4, an5, an6]).play();

        this.expandedHeader = true;

      } else if (this.scrollDirection === 'D') {

        const an4 = this.animationCtrl.create()
          .addElement(this.spacer)
          .duration(200)
          .to('height', this.spacerHeight + 'px');

        const an5 = this.animationCtrl.create()
          .addElement(this.imageRef)
          .to('top', '0px')
          .duration(100);

        const an6 = this.animationCtrl.create()
          .addElement(this.fabLeft1.el.parentElement)
          .to('top', this.masterTopOffset + 'px')
          .duration(100);

        const an7 = this.animationCtrl.create()
          .addElement(this.fabRight1.el.parentElement)
          .to('top', this.masterTopOffset + 'px')
          .duration(100);

        const an8 = this.animationCtrl.create()
          .addElement(this.fabRight2.el.parentElement)
          .to('top', this.masterTopOffset + 'px')
          .duration(100);

        const an9 = this.animationCtrl.create()
          .addElement(this.barSearchRef.el)
          .to('opacity', '0%')
          .duration(50);

        this.animationCtrl.create()
          .addAnimation([an4, an5, an6, an7, an8, an9]).play();

        this.expandedHeader = false;

      }

      //--> avoid image scale effect when revealing the search bar
      if (this.expandedHeader === false) {

        //--> animate image scale (bump) + move down
        this.animationCtrl.create()
          .addElement(this.imageRef)
          .duration(100)
          .to('transform', 'scale3d(' + imagescaleDown + ',' + imagescaleDown + ',1) translate3d(0,' + imageMoveUp + 'px,0)').play();

      }

    });

  }

  ngAfterViewInit() {

    //--> reference to master tabs
    this.ionTabs = document.querySelector('ion-tab-bar');

    //--> catch pan movement (not captured), to get direction 
    this.gestureCtrl.create({
      el: this.content.el,
      threshold: 15,
      gestureName: 'my-gesture',
      notCaptured: ev => {

        if (ev.deltaY < 0) {
          this.scrollDirection = 'D';

          if (this.prevIonTabBarHeight === undefined) {
            const cs = getComputedStyle(this.ionTabs);
            this.prevIonTabBarHeight = this.ionTabs.clientHeight - parseInt(cs.paddingBottom, 10);
          }

        } else {
          this.scrollDirection = 'U';
        }

        this.startScrollPosition = this.vse.measureScrollOffset();
      }
    }, true).enable();


    //---> catch pan movement of mover notch
    this.gestureCtrl.create({
      el: this.mover,
      threshold: 15,
      gestureName: 'mover',
      onEnd: ev => {
        this.dragInMover = false;
        this.domCtrl.write(() => {
          this.renderer.setStyle(this.moverBadge.el, 'visibility', 'hidden');
        });
      },
      onStart: ev => {
        this.dragInMover = true;
        this.domCtrl.read(() => {
          this.moverStartDragPos = this.mover.getBoundingClientRect().y;
        });

        this.domCtrl.write(() => {
          this.renderer.setStyle(this.moverBadge.el, 'visibility', 'initial');
        });
      },
      onMove: ev => {
        let topPos = this.moverStartDragPos + ev.deltaY;
        if (topPos < 200) {
          topPos = 200;
        }
        if (topPos > 700) {
          topPos = 700;
        }

        const elCount = this.vse.getDataLength();
        const perc = (topPos - 200) / (700 - 200);
        let elIdx = Math.ceil(elCount * perc);
        if (elIdx < 6) {
          elIdx = 6;
        }

        this.domCtrl.write(() => {
          this.renderer.setStyle(this.mover, 'top', topPos + 'px');
          this.vse.scrollToIndex(elIdx);
        });
      },
      disableScroll: true,
      direction: 'y',
      gesturePriority: 100
    }, true).enable();


    //--> list index change: trace end of the list show + update mover notch text
    this.vse.scrolledIndexChange.subscribe(function($event) {

      this.domCtrl.write(() => {
        this.moverBadge.el.innerHTML = 'in index ' + $event;
      });

      if (this.vse.getDataLength() === this.vse.getRenderedRange().end) {
        this.stopFooterMovement = true;
      } else {
        this.stopFooterMovement = false;
      }

      if (this.dragInMover === false) {
        const elCount = this.vse.getDataLength();
        const perc = $event / elCount;
        const topPos = Math.floor(200 + ((700 - 200) * perc));

        this.domCtrl.write(() => {
          this.renderer.setStyle(this.mover, 'top', topPos + 'px');
        });
      }
    }.bind(this));


    //this.vse.elementScrolled()
    this.vse.scrollDispatcher.scrolled(1).subscribe(function(event) {

      this.animateOnScroll(this.vse.measureScrollOffset());

      //--> show / hide bottom FAB
      if (this.lastScrollOffset > 0) {

        if (this.vse.measureScrollOffset() > this.lastScrollOffset && this.vse.measureScrollOffset() > 350 && this.bottomFabVisible === false && this.stopFooterMovement === false) {

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

        } else if (this.vse.measureScrollOffset() < this.lastScrollOffset && this.bottomFabVisible === true) {

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

      this.lastScrollOffset = this.vse.measureScrollOffset();

    }.bind(this));
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
