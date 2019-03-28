import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  city: string;


  constructor(
    public alertController: AlertController,
    private storage: Storage
    ) {}


  ngOnInit() {
    this.storage.get('city').then(
      city => this.city = city
    );
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.city,
      buttons: [{
        text:'OK',
        handler:() => {
          //on stocke la ville quand on clique sur OK
          this.storage.set('city',this.city);
        }
      }]
    });

    await alert.present();
  }

  save(){
    this.presentAlert();
    /**
     * utiliser le service Alert Controller de Ionic
     * pour afficher la ville saisie dans une fenetre
     * "modal"
     */
    console.log(this.city);
  }
}
