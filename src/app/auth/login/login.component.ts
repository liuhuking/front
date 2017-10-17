import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmailValidator } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from '../common/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  message = '';
  submitted = false;
  passwordResetPrompt = false;

  constructor(private http: HttpClient, private router: Router) {
    this.user = new User("", "", "", "");
  }

  ngOnInit() {
    if(sessionStorage){
      this.router.navigate(['/task']);
    }
  }

  onSubmit() {
    this.submitted = true;
    this.http.post('http://localhost:3000/users2/authenticate', this.user).subscribe(data => {
      if (data['token']) {
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        location.reload();
        this.router.navigate(['/task']);
      }
    }, (err: HttpErrorResponse) => {
      if(err.error == 'Username or password incorrect'){
        this.message = 'Username or password is incorrect.';
        this.passwordResetPrompt = true;
      }else{
        this.message = 'An error occurred. Please try later.';
      }
    });
  }
}