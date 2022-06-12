import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormVariables } from '../form-variables';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private route: Router, private auth: AuthService, private titleService: Title, 
    private snackBar: MatSnackBar, private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.titleService.setTitle("Strona logowania");

    this.loginForm = this.fb.group(FormVariables.loginForm);
  }

  login(fg: FormGroup) {
    this.auth.login(fg.value).subscribe({
      next: (response) => {
        if(response.body['userActive']) {
          const token = response.headers.get("Authentication");

          localStorage.setItem("token", token);
          localStorage.setItem("id", response.body['id']);

          this.snackBar.open("Zalogowano pomyślnie!", "Ok", {
            duration: 4000
          });
        }
        else {
          this.snackBar.open("Twoje konto jest zablokowane", "", {
            duration: 4000,
          });
        }
      },
      complete: () => this.route.navigate(["/"]),
      error: (error : HttpErrorResponse) => {
        switch(error.status) {
          case 401:
            this.snackBar.open("Niepoprawne dane logowania!", "Ok", {
              duration: 4000
            });
            break;
          default:
            this.snackBar.open("Wystąpił błąd!", "Ok", { duration: 4000});
            console.error(error);
            break;
        }
      }
    });
  }
}