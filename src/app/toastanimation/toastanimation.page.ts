import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AnimationController, DomController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-toastanimation',
  templateUrl: './toastanimation.page.html',
  styleUrls: ['./toastanimation.page.scss'],
})
export class ToastanimationPage implements OnInit, AfterViewInit {

  @ViewChild('lottie') animationElement: any;
  lottieAnimation: any;

  constructor(private modalCtrl: ModalController,private animationCtrl: AnimationController, private domCtrl: DomController) { }

  ngOnInit() {
  }

  animationCreated($event){
    this.lottieAnimation = $event; //<-- store lottie object reference
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.lottieAnimation.play();

      this.domCtrl.write(() => {

        //--> "grow" lottie
        const an1 = this.animationCtrl.create()
          .addElement(this.animationElement.container.nativeElement )
          .to('transform', 'scale3d(2.2,2.2,1')
          .delay(400)
          .duration(300);

        this.animationCtrl.create().addAnimation([an1]).play();

      });

      //--> then close dialog
      setTimeout(()=>{
        this.modalCtrl.dismiss();
      },1700);
    },500);
  }

}
