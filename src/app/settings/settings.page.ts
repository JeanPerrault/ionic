import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  city: string;


  constructor(
    public alertController: AlertController,
    private storage: Storage,
    private geolocation: Geolocation,
    private http: HttpClient
    ) {}


  ngOnInit() {
    // On récupére la ville dans la bdd si elle est présente
    this.storage.get('city').then(
      city => this.city = city
    );
  }

  async presentAlert(message, handler = null) {
    const alert = await this.alertController.create({
      header: message,
      buttons: [{
        text: 'OK',
        handler: handler
      }]
    });

    await alert.present();
  }

  save(){
    this.presentAlert(this.city, () => {
      // On stocke la ville quand on clique sur OK
      this.storage.set('city', this.city);
      // this.storage.set('foo', {'bar': 'id', 'id': 'toto'});
    });

    /**
     * Utiliser le service Alert Controller de Ionic
     * pour afficher la ville saisie dans une fenêtre 
     * "modal"
     */
    console.log(this.city);
  }
  gps(){
    this.geolocation.getCurrentPosition().then(resp => {
      this.presentAlert(resp.coords.latitude + ' ' + resp.coords.longitude);
      return this.http.get('https://api-adresse.data.gouv.fr/reverse/?lat='+resp.coords.latitude+'&lon='+resp.coords.longitude).toPromise();
    }).then(response => this.city = this.parseCity(response['features'][0]['properties']['city']))
    .catch(error => this.presentAlert(error.message));
  }

  /**
   * On peut modifier la chaine contenant la ville.
   * Noyelles Sous Lens devient noyelles-sous-lens
   * @param string Ville
   */
  parseCity(string: string) {
    if ('La Madeleine' === string) {
      string = string.replace('La ', '');
    }

    string = string.replace(' ', '-');


    return string.toLowerCase();
  }

       
    
  
}
