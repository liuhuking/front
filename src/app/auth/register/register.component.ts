import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmailValidator } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  message = '';
  user = {};
  submitted = false;

  constructor(private http: HttpClient, private router: Router) {
    this.user = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "Guest"
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.http.post('http://localhost:3000/users2/register', this.user).subscribe(data => {
      this.router.navigate(['/login']);
    }, (err: HttpErrorResponse) => {
      if(err.error == 'email taken'){
        this.message = 'The email ' + this.user['email'] + ' is already registered.';
      }else if(err.error == 'invalid input'){
        this.message = 'Invalid input error. Please enter correct values'
      }else{
        this.message = 'An error occurred. Please try later.';
      }
    });
  }
}
