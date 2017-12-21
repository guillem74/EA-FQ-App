import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import {MainPage} from "../pages";
import {FormBuilder, FormGroup} from '@angular/forms';
import { AlertController, App } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {FirstRunPage} from "../pages";

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  rootPage=FirstRunPage;
  currentItems: any=[{}];
  searchForm: FormGroup;
  private results: any=[{}];
  search: {filter: string, parameter: string}={
    filter: '',
    parameter:''
  };

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, private fb: FormBuilder,
              private alertCtrl: AlertController, public toastCtrl: ToastController, private app:App) {
    this.searchForm = fb.group({
      'filter':'',
      'parameter':''
    });

  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    /*this.currentItems=this.items.query();
    console.log("okj:")
    console.log(this.currentItems)*/

    let seq=this.items.query();


    seq.subscribe((res: any) => {
      this.currentItems=res;
      this.results=this.currentItems;
      if (res.status == 'success') {

      } else {

      }
    }, err => {
      console.error('ERROR', err);
    });
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */


  private searchProduct(){
    let filter=this.search.filter;
    let param=this.search.parameter;

    if(filter=="all")
      this.showAll();

    else if(filter=='name'){
      this.searchByname(param);
    }
    else if(filter=="studies"){
      this.searchBystudies(param);
    }
    else if(filter=="semester"){
      this.searchBysemester(param);
    }
    else if(filter=="order"){
      this.order();
    }
  }

  private showAll(){
    this.results=this.currentItems;
  }

  private searchByname(name){
    this.results=this.currentItems.filter(x=>x.name==name);

  }
  private searchBystudies(studies){
    this.results=this.currentItems.filter(x=>x.studies==studies);

  }
  private searchBysemester(semester){
    this.results=this.currentItems.filter(x=>x.semester==semester);

  }
  private order(){
    this.results=this.currentItems.sort(function(a,b){return a.name>b.name});
}
  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    let alert = this.alertCtrl.create({
      title: 'Borrar asignatura',
      message: '¿Estás seguro que deseas borrar la asignatura?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('La asignatura no ha sido borrada');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
              this.items.deletesubject(item).subscribe((resp) => {
                let toast = this.toastCtrl.create({
                  message: "Asignatura borrada",
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
                this.app.getRootNav().setRoot(this.rootPage)

              }, (err) => {
                // Unable to log in
                let toast = this.toastCtrl.create({
                  message: "Error al borrar la asignatura",
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
              });
          }

        }
      ]
    });
    alert.present();
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
