import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Settings, User} from '../../providers/providers';
import { AlertController, App } from 'ionic-angular';
import {FirstRunPage} from "../pages";

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  rootPage=FirstRunPage;

  account: { name: string, studies: string, semester: string } = {
    name: '',
    studies: '',
    semester: ''
  };
  // Our local settings object
  options: any;

  settingsReady = false;

  //form: FormGroup;

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;

  subSettings: any = SettingsPage;

  constructor(public navCtrl: NavController,
    public user: User,
    public settings: Settings,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    private storage:Storage,
    private app:App,
    private alertCtrl: AlertController) {


  }

  confirm1() {
    let alert = this.alertCtrl.create({
      title: 'Añadir asignatura',
      message: '¿Deseas añadir una nueva asignatura?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('No se ha añadido ninguna asignatura');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            let user:any;
              this.user.addsubject(this.account).subscribe((resp) => {
                this.app.getRootNav().setRoot(this.rootPage);
                let toast = this.toastCtrl.create({
                  message: "Asignatura añadida",
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
              }, (err) => {
                // Unable to log in
                let toast = this.toastCtrl.create({
                  message: "Error al añadir asignatura",
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


  confirm2() {
    let alert = this.alertCtrl.create({
      title: 'Borrar cuenta',
      message: '¿Estás seguro que quieres borrar tu cuenta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Tu cuenta sigue activa');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            let user:any;
            this.storage.get('user').then((resp) => {
              user=resp;
              console.log(user);
              this.user.deleteuser(user).subscribe((resp) => {
                let toast = this.toastCtrl.create({
                  message: "Usuario borrado",
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
                this.app.getRootNav().setRoot(this.rootPage)

              }, (err) => {
                // Unable to log in
                let toast = this.toastCtrl.create({
                  message: "Error al borrar el usuario",
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
              });
            });
          }

        }
      ]
    });
    alert.present();
  }

  cerrarsesion(){
    this.app.getRootNav().setRoot(this.rootPage)
  }

}
