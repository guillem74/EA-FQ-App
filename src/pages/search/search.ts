import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, ToastController} from 'ionic-angular';
import { AlertController, App } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import {FirstRunPage} from "../pages";
import {Tab2Root} from "../pages";
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  rootPage=Tab2Root;
  currentItems: any = [{}];
  private results: any=[{}];


  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public items: Items,
              private alertCtrl: AlertController, public toastCtrl: ToastController, private app: App) { }


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
  deleteStudent(item) {
    let alert = this.alertCtrl.create({
      title: 'Borrar alumno',
      message: '¿Estás seguro que deseas borrar el alumno?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('El alumno no ha sido borrado');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.items.deletestudent(item).subscribe((resp: any) => {
              var index = this.currentItems.indexOf(item);
              this.currentItems.splice(index, 1);
              let toast = this.toastCtrl.create({
                message: "Alumno borrado",
                duration: 3000,
                position: 'top'
              });
              toast.present();

            }, (err) => {
              // Unable to log in
              let toast = this.toastCtrl.create({
                message: "Error al borrar el alumno",
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


}
