/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable one-var */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit, ViewChild } from '@angular/core';

import SwiperCore, { Parallax } from 'swiper';

SwiperCore.use([Parallax]);

@Component({
  selector: 'app-popupnews',
  templateUrl: './popupnews.page.html',
  styleUrls: ['./popupnews.page.scss'],
})
export class PopupnewsPage implements OnInit {

  @ViewChild('swiper') swiperRef: any;

  o: any;
  l: any;
  i: any;

  constructor() { }

  ngOnInit() {

  }

  transitionStart(e){
    const {slides: r, previousIndex: s, activeIndex: n, $el: a} = e;
    this.l || (this.o = !0);
    const f = r.eq(n)
      , u = r.eq(s)
      , v = u.find(".fashion-slider-scale")
      , m = u.find("img")
      , g = f.find("img")
      , p = n - s
      //, y = f.attr("data-slide-bg-color");
      ,y = '#D7A594';
    a.css("background-color", y),
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

  }

  initswiper(e){
    const {slides: r, activeIndex: s, $el: n} = e;

    //--> stop for opening the reset of state of image of fist slide (scale, ...)
    this.stopAnimations(n);

    const a = r.eq(s).attr('data-slide-bg-color');
    n.css('background-color', '#D7A594'),
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

prevSlide(){
  this.swiperRef.swiperRef.slidePrev();
}

nextSlide(){
  this.swiperRef.swiperRef.slideNext();
}


}
