import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  message = '';
  user = {};
  submitted = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit() {
    this.http.post('http://localhost:3000/users2/resetpassword', this.user, { observe: 'response' }).subscribe(data => {

    }, (err: HttpErrorResponse) => {
      if (err.status == 400) {
        this.message = "Error: Your email is not registered with us.";
      }
      if (err.status == 200){
        this.message = "Email has been sent with your new password. If it does not arrive, please try again.";
      }
    });
  }

}
