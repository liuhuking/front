import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jsonp, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  featureList = [];
  user = JSON.parse(sessionStorage.getItem('currentUser'));
  userIP = '';
  country = '';

  constructor(private http: HttpClient, private jsonp: Jsonp) {
    if (this.user) {
      if (this.user['role'] == 'Admin') {
        this.featureList['user'] = true;
      }
    }

    if (sessionStorage.getItem('currentUser')) {
      this.featureList['logout'] = true;
      this.featureList['task'] = true;
      this.featureList['myUserData'] = true;
    } else {
      this.featureList['login'] = true;
      this.featureList['register'] = true;
    }

    this.jsonp.get('http://api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK').map(res => {
      this.userIP = res.json()['ip'];
    }).subscribe(res => {
      this.http.get('http://localhost:3000/locationservice/' + this.userIP).map(res => {
        this.country = res['country_name'];
      }).subscribe();
    });
  }

  confirmLogout() {
    let response = confirm("Are you sure you want to log out?");
  }
}