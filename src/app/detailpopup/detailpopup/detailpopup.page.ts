import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AnimationController, GestureController } from '@ionic/angular';

@Component({
  selector: 'app-detailpopup',
  templateUrl: './detailpopup.page.html',
  styleUrls: ['./detailpopup.page.scss'],
})
export class DetailpopupPage implements OnInit, AfterViewInit {

  @ViewChild('header') headerImage: ElementRef;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private renderer: Renderer2,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit(): void {
    //--> nothing
  }

  ngAfterViewInit() {

    const coords = this.navParams.get('coords');

    this.renderer.setStyle(this.headerImage.nativeElement, 'width', coords.w + 'px');
    this.renderer.setStyle(this.headerImage.nativeElement, 'height', coords.h + 'px');
    this.renderer.setStyle(this.headerImage.nativeElement, 'transform', `translate3d(0, ${coords.y - 56}px, 0) scale3d(1, 0.9, 1)`);
    this.renderer.setStyle(this.headerImage.nativeElement, 'transition', '0.2s ease-in-out');

    setTimeout(() => {

      const timing = 200;
      const an1 = this.animationCtrl.create()
        .addElement(this.headerImage.nativeElement)
        .to('width', '100%')
        .easing('cubic-bezier(1.000, 0.090, 0.995, 0.370)')
        .duration(timing);

      const an2 = this.animationCtrl.create()
        .addElement(this.headerImage.nativeElement)
        .to('height', '35%')
        .easing('cubic-bezier(1.000, 0.090, 0.995, 0.370)')
        .duration(timing);

      const an3 = this.animationCtrl.create()
        .addElement(this.headerImage.nativeElement)
        .to('transform', 'translate3d(0, 0, 0) scale3d(1, 1, 1)')
        .duration(timing);

      this.animationCtrl.create().addAnimation([an1, an2, an3]).play().then(()=>{
        this.renderer.setStyle(this.headerImage.nativeElement, 'border-radius', '0em');
      });
    }, 50);

  }

  close() {
    this.modalCtrl.dismiss();
  }

}
