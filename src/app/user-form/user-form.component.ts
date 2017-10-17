import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { EmailValidator } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user = {};
  id = this.route.snapshot.paramMap.get('id');
  title = "";
  submitted = false;
  roles = ['Admin', 'Guest'];
  message = '';
  currentUser = JSON.parse(sessionStorage['currentUser']);

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
    private router: Router
  ) {
    if (!this.id) {
      this.title = "New User";
    } else {
      this.title = "Edit User";
    }

  }

  ngOnInit() {
    if (this.id) {
      this.http.get("http://localhost:3000/users2/" + this.id,
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(sessionStorage['currentUser'])['token']) }).subscribe(data => {
        if (data) {
          this.user['_id'] = data['_id'];
          this.user['email'] = data['email'];
          this.user['firstName'] = data['firstName'];
          this.user['lastName'] = data['lastName'];
          this.user['role'] = data['role'];
        } else {
          this.router.navigate(['/user']);
        }
      }, (err: HttpErrorResponse) => {
        this.router.navigate(['/user']);
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.id) {
      this.http.put('http://localhost:3000/users2/' + this.id, this.user,
        { headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(sessionStorage['currentUser'])['token']) }).subscribe(data => {
          this.router.navigate(['/user']);
        }, (err: HttpErrorResponse) => {
          if (err.error == 'invalid input') {
            this.message = 'Invalid input error. Please enter correct values.'
          } else {
            this.message = 'An error occurred. Please try later.';
          }
        });
    } else {
      this.http.post('http://localhost:3000/users2/register', this.user).subscribe(data => {
        this.router.navigate(['/user']);
      }, (err: HttpErrorResponse) => {
        if (err.error == 'email taken') {
          this.message = 'The email ' + this.user['email'] + ' is already registered.';
        } else if (err.error == 'invalid input') {
          this.message = 'Invalid input error. Please enter correct values'
        } else {
          this.message = 'An error occurred. Please try later.';
        }
      });
    }

  }
}