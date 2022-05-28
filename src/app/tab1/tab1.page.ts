import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public actionSheetController: ActionSheetController) {}

  async goToCarts(){

    const actionSheet = await this.actionSheetController.create({
      header: 'I miei carrelli',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Sushi & co',
        icon: 'cart',
        id: 'delete-button',
        cssClass: 'cartButtonAction',   //<--- NB: style must be in global.scss to avoid CSS encapsulation
        data: {
          type: 'delete'
        },
        handler: () => {
          //--> go here to specific cart
        }
      }, {
        text: 'DYP e confezionato',
        icon: 'cart',
        cssClass: 'cartButtonAction',
        data: 10,
        handler: () => {
          //--> go here to specific cart
        }
      }, {
        text: 'indietro',
        icon: 'close',

        role: 'cancel',
        handler: () => {
          //--> just close
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

}
