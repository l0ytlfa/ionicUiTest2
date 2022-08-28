import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-toastanimation',
  templateUrl: './toastanimation.page.html',
  styleUrls: ['./toastanimation.page.scss'],
})
export class ToastanimationPage implements OnInit, AfterViewInit {

  @ViewChild('lottie') animationElement: any;
  lottieAnimation: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  animationCreated($event){
    this.lottieAnimation = $event;
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.lottieAnimation.play();

      //--> then close dialog
      setTimeout(()=>{
        this.modalCtrl.dismiss();
      },1700);
    },500);
  }

}
