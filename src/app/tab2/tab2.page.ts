import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  items: any[] = [];

  constructor() {
    for(let idx=1;idx<200;idx++){
      this.items.push({r1:'title here! '+idx,r2:'sub title here',r3:'description is long thing'});
    }
  }

}
