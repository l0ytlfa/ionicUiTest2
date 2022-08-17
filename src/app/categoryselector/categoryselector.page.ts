import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-categoryselector',
  templateUrl: './categoryselector.page.html',
  styleUrls: ['./categoryselector.page.scss'],
})
export class CategoryselectorPage implements OnInit {

  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {
  }

  subCategorySelect($event){
    debugger;
  }

  closeSubCategorySelect($event){
    this.modalCtrl.dismiss();
  }

}
