import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AnimationController, DomController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-toastanimation',
  templateUrl: './toastanimation.page.html',
  styleUrls: ['./toastanimation.page.scss'],
})
export class ToastanimationPage implements OnInit, AfterViewInit {

  @ViewChild('lottie') animationElement: any;
  @ViewChild('masterdiv') masterdiv: any;
  
  lottieAnimation: any;
  primaryText: string;
  primaryColor: string;

  constructor(private modalCtrl: ModalController,private animationCtrl: AnimationController, private domCtrl: DomController,
    private navParams: NavParams) { }

  ngOnInit() {
    const coords = this.navParams.get('coords');
    this.primaryText = coords.toastText;
    this.primaryColor = coords.toastBackColor;
  }

  animationCreated($event){
    this.lottieAnimation = $event; //<-- store lottie object reference
  }

  ngAfterViewInit(){

    this.masterdiv.nativeElement.style.background = this.primaryColor;

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
