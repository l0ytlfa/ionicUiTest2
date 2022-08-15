import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AnimationController, GestureController } from '@ionic/angular';

@Component({
  selector: 'app-detailspecial',
  templateUrl: './detailspecial.page.html',
  styleUrls: ['./detailspecial.page.scss'],
})
export class DetailspecialPage implements OnInit, AfterViewInit {

  @ViewChild('header') headerImage: ElementRef;
  @ViewChild('CNT') CNT: any;
  @ViewChild('buttonsDiv') buttonsDiv: any;

  popupVars: any

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private renderer: Renderer2,
    private animationCtrl: AnimationController
  ) { }

  closePopup($event){
    this.modalCtrl.dismiss();
  }

  ngOnInit(): void {
    //--> nothing
  }

  ngAfterViewInit() {

    const coords = this.navParams.get('coords');
    this.popupVars = coords

    this.renderer.setStyle(this.headerImage.nativeElement, 'width', coords.w + 'px');
    this.renderer.setStyle(this.headerImage.nativeElement, 'height', coords.h + 'px');
    this.renderer.setStyle(this.headerImage.nativeElement, 'transform', `translate3d(${coords.x}px, ${coords.y - 56}px, 0) scale3d(1, 1, 1)`);

    this.renderer.setStyle(this.buttonsDiv.nativeElement , 'transform', `translate3d(${coords.x}px, ${Math.trunc(coords.clientHeight/1.75)}px, 0)`);
    this.renderer.setStyle(this.buttonsDiv.nativeElement , 'opacity','0');
    

    this.renderer.setStyle(this.headerImage.nativeElement, 'transition', '0.2s ease-in-out');
    this.renderer.setStyle(this.buttonsDiv.nativeElement , 'transition', '0.2s ease-out');

    setTimeout(() => {

      //--> "move" image
      const timing = 200;
      const an1 = this.animationCtrl.create()
        .addElement(this.headerImage.nativeElement)
        .to('width', '90%')
        .duration(timing);

      const an2 = this.animationCtrl.create()
        .addElement(this.headerImage.nativeElement)
        .to('height', '30%')
        .duration(timing);

      const an3 = this.animationCtrl.create()
        .addElement(this.headerImage.nativeElement)
        .to('transform', 'translate3d('+coords.x+'px, '+Math.trunc(coords.clientHeight/3)+'px, 0) scale3d(1, 1, 1)')
        .duration(timing);

      const an4 = this.animationCtrl.create()
      .addElement( coords.outContainer.el)
      .to('transform', 'scale3d(0.97,0.97,0.97)')
      .duration(timing);


      this.animationCtrl.create().addAnimation([an1, an2,an3,an4]).play().then(() => {
        this.renderer.setStyle(this.headerImage.nativeElement, 'border-radius', '1em');

        //--> appear buttons
        this.animationCtrl.create()
        .addElement(this.buttonsDiv.nativeElement)
        .beforeStyles({ opacity: 0 })
        .to('opacity', '1')
        .duration(timing).play();

      });



    }, 50);

  }

  close() {
    const an4 = this.animationCtrl.create()
      .addElement( this.popupVars.outContainer.el)
      .to('transform', 'scale3d(1,1,1)')
      .duration(100).play().then(()=>{
        this.modalCtrl.dismiss();
      });
    
  }

}
