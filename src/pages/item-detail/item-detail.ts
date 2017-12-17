import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  currentItems2: any = [{}];
  private results2: any=[{}];

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items,  public items2: Items) {
    this.item = navParams.get('item') //|| items.defaultItem;
    console.log(this.item.students)
  }
  ionViewDidLoad() {
    let seq2=this.items2.query2();


    seq2.subscribe((res: any) => {
      this.currentItems2=res;
      this.results2=this.currentItems2;
      if (res.status == 'success') {

      } else {

      }
    }, err => {
      console.error('ERROR', err);
    });
  }

}
