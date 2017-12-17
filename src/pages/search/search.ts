import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController} from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = [{}];
  private results: any=[{}];


  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public items: Items) { }


  ionViewDidLoad() {
  let seq2=this.items.query2();


  seq2.subscribe((res: any) => {
    this.currentItems=res;
    this.results=this.currentItems;
    if (res.status == 'success') {

    } else {

    }
  }, err => {
    console.error('ERROR', err);
  });
  }

}
