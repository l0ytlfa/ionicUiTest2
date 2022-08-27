/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable one-var */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

import SwiperCore, { Parallax } from 'swiper';

SwiperCore.use([Parallax]);

@Component({
  selector: 'app-popupnews',
  templateUrl: './popupnews.page.html',
  styleUrls: ['./popupnews.page.scss'],
})
export class PopupnewsPage implements OnInit {

  @ViewChild('swiper') swiperRef: any;
  @ViewChild('SPREV') sprev: any;
  @ViewChild('SNEXT') snext: any;
  @ViewChild('CLOSEBUTTON') closebutton: any;

  o: any;
  l: any;
  i: any;

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {

  }

  closeDialog($event){
    this.modalCtrl.dismiss();
  }


  //-------> swiper effects

  transitionStart(e){
    const {slides: r, previousIndex: s, activeIndex: n, $el: a} = e;
    this.l || (this.o = !0);
    const f = r.eq(n)
      , u = r.eq(s)
      , v = u.find(".fashion-slider-scale")
      , m = u.find("img")
      , g = f.find("img")
      , p = n - s;

    let averageRgb;
    let averageHex;

    //--> get average color from next slide image.....
    if(g[0] !== undefined){
      averageRgb = this.getAverageRGB(g[0]);
      averageHex = this.rgbToHex(averageRgb.r,averageRgb.g,averageRgb.b);
    }

    a.css("background-color", averageHex),
    v.transform("scale(0.6)"),
    m.transition(1e3).transform("scale(1.2)"),
    u.find(".fashion-slider-title-text").transition(1e3).css("color", "rgba(255,255,255,0)"),
    m.transitionEnd(()=>{
        g.transition(1300).transform("translate3d(0, 0, 0) scale(1.2)"),
        m.transition(1300).transform(`translate3d(${60 * p}%, 0, 0)  scale(1.2)`);
    }
    );
  }

  transitionEnd(e){

    const {slides: r, activeIndex: s, $el: n} = e
    , a = r.eq(s)
    , f = a.find("img");

    //--> set image and back to fill the page (base CSS set transalted for later animation)
    a.find(".fashion-slider-scale").transform("scale(1)")
    ,f.transition(1e3).transform("scale(1)")
    ,a.find(".fashion-slider-title-text").transition(1e3).css("color", "rgba(255,255,255,1)");

    f.transitionEnd(()=>{
        this.o = !1;
    });

    //---> manage buttons hide / show
    s === 0 ? this.sprev.el.classList.add('hidePrevNextButton') : this.sprev.el.classList.remove('hidePrevNextButton'),
    s === r.length - 1 ? this.snext.el.classList.add('hidePrevNextButton') : this.snext.el.classList.remove('hidePrevNextButton');

    //--> close button
    s === r.length - 1 ? this.closebutton.el.classList.remove('hidePrevNextButton') : this.closebutton.el.classList.add('hidePrevNextButton');

  }

  initswiper(e){
    const {slides: r, activeIndex: s, $el: n} = e;

    //--> stop for opening the reset of state of image of fist slide (scale, ...)
    this.stopAnimations(n);
    e.emit('transitionEnd');

  }

  stopAnimations(e){
    e.addClass('fashion-slider-no-transition'),
    this.l = !0,
    cancelAnimationFrame(this.i),
    this.i = requestAnimationFrame(()=>{
        this.l = !1,
        this.o = !1;
    }
    );
}


//------> dynamic color

componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

rgbToHex(r, g, b) {
  return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
}

getAverageRGB(imgEl) {

  let blockSize = 5, // only visit every 5 pixels
      defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
      canvas = document.createElement('canvas'),
      context = canvas.getContext && canvas.getContext('2d'),
      data, width, height,
      i = -4,
      length,
      rgb = {r:0,g:0,b:0},
      count = 0;

  if (!context) {
      return defaultRGB;
  }

  height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);

  try {
      data = context.getImageData(0, 0, width, height);
  } catch(e) {
      /* security error, img on diff domain */
      return defaultRGB;
  }

  length = data.data.length;

  while ( (i += blockSize * 4) < length ) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i+1];
      rgb.b += data.data[i+2];
  }

  // ~~ used to floor values
  rgb.r = Math.floor(rgb.r/count);
  rgb.g = Math.floor(rgb.g/count);
  rgb.b = Math.floor(rgb.b/count);

  return rgb;

}

prevSlide(){
  this.swiperRef.swiperRef.slidePrev();
}

nextSlide(){
  this.swiperRef.swiperRef.slideNext();
}


}
