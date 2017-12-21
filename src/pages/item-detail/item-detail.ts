import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Items, User } from '../../providers/providers';
import { AlertController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  currentItems2: any = [{}];
  private results2: any = [{}];

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public items2: Items,
              public user: User, private alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.item = navParams.get('item') //|| items.defaultItem;
    console.log(this.item.students)
  }

  ionViewDidLoad() {
    let seq2 = this.items2.query2();


    seq2.subscribe((res: any) => {
      this.currentItems2 = res;
      this.results2 = this.currentItems2;
      if (res.status == 'success') {

      } else {

      }
    }, err => {
      console.error('ERROR', err);
    });
  }

  addStudenttoSubject(item, item2) {
    let idsub = item._id;
    let idstu = item2._id;
    let alert = this.alertCtrl.create({
      title: 'Añadir alumno',
      message: '¿Estás seguro que deseas añadir al alumno?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('El alumno no ha sido añadido');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.user.addto(idsub, idstu).subscribe((resp) => {
              this.item=resp;
              let toast = this.toastCtrl.create({
                message: "Alumno añadido",
                duration: 3000,
                position: 'top'
              });
              toast.present();


            }, (err) => {
              // Unable to log in
              let toast = this.toastCtrl.create({
                message: "Error al añadir al alumno",
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
  delStudenttoSubject(item, student) {
    let idsub = item._id;
    let idstu = student._id;
    let alert = this.alertCtrl.create({
      title: 'Quitar alumno',
      message: '¿Estás seguro que deseas quitar al alumno?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('El alumno no ha sido quitado');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.user.delto(idsub, idstu).subscribe((resp) => {
              var index = this.item.students.indexOf(student);
              this.item.students.splice(index,1)
              let toast = this.toastCtrl.create({
                message: "Alumno quitado",
                duration: 3000,
                position: 'top'
              });
              toast.present();


            }, (err) => {
              // Unable to log in
              let toast = this.toastCtrl.create({
                message: "Error al quitar al alumno",
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


