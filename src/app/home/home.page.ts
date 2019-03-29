import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  city:string;
  meteo ={
  image:null,
  temperature: null,
  error: false,
  }
  days: object[] = [];

  constructor(
    private router: Router,
    private storage: Storage,
    private http: HttpClient,
    ) { }

  /**
   * quand on retourne sur la page home, on recharge
   * la ville a partir du storage
   */  
  ionViewWillEnter(){
    this.storage.get('city').then(c => {
      this.city = c;
      return this.http.get('https://www.prevision-meteo.ch/services/json/'+ this.city).toPromise();
    }).then(
      response => {
        // On reset la météo
        this.meteo = {
          image: null,
          temperature: null,
          error: false
        };
        this.days = [];

        // Si pas de ville choisie, on ne fait rien
        if (this.city === null || this.city.length === 0) {
          return;
        }

        // Si la ville n'est pas trouvée par l'API
        if (response.hasOwnProperty('errors')) {
          this.meteo.error = true;
          return;
        }

        this.meteo.image = response['current_condition']['icon_big'];
        this.meteo.temperature = response['current_condition']['tmp'];
        this.city = response['city_info']['name'];

        /**
         * On veut afficher dans le template la température pour les 4
         * prochains jours. On utilisera une "ion-list".
         */
        for (let i of [1, 2, 3, 4]) {
          this.days.push(response['fcst_day_' + i]);
        }
      }
    );
  }

  navToAbout() {
    this.router.navigate(['/about']);
  }  
}
