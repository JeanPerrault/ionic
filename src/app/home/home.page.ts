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

  constructor(
    private router: Router,
    private storage: Storage,
    private http: HttpClient
    ) { }

  /**
   * quand on retourne sur la page home, on recharge
   * la ville a partir du storage
   */  
  ionViewWillEnter(){
    this.storage.get('city').then(c => {
      this.city = c;
      return this.http.get('https://www.prevision-meteo.ch/services/json/hulluch'+ this.city).toPromise();
    }).then(
      response => console.log(response)
      );

    
  }

  navToAbout() {
    this.router.navigate(['/about']);
  }  
}
