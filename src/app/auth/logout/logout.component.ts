import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private _location: Location) { }

  ngOnInit() {
    if(sessionStorage){
      let response = confirm("Are you sure you want to logout?");
      if(response){
        sessionStorage.removeItem('currentUser');
        location.reload();
        this.router.navigate(['/login']);
      }else{
        this._location.back();
      }
    }
  }
}