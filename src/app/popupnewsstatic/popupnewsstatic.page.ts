import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-popupnewsstatic',
  templateUrl: './popupnewsstatic.page.html',
  styleUrls: ['./popupnewsstatic.page.scss'],
})
export class PopupnewsstaticPage implements OnInit {

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  closeDialog(){
    this.modalCtrl.dismiss();
  }

}
