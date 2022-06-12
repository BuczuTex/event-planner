import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UserRoles } from '../models/user';
import { FormVariables } from '../form-variables';
import { CustomValidators } from '../customvalidators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  errors = {
    incorrectPasswords: "Hasła nie są zgodne.",
    required: "Hasło jest wymagane."
  };
  userForm: FormGroup;

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar,
     private titleService: Title, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.titleService.setTitle("Strona rejestracji");

    this.userForm = this.fb.group(FormVariables.userForm, { validators: CustomValidators.passwordDoesNotMatchValidator});
  }

  register(fg: FormGroup) {
    if(fg.valid) {
      var user = new User(fg.value['userName'], fg.value['password'], fg.value['firstName'], fg.value['lastName'], 
      fg.value['email'], UserRoles.USER, false, true);
      this.auth.register(user).subscribe({
        complete: () => {
          this.router.navigate(["/login"]);
          this.snackBar.open("Konto zostało założone pomyślnie. Można się zalogować.", "Zamknij");      
        }
      });
    }
    fg.markAllAsTouched();
  }

  returnErrors(ctrl: AbstractControl) {
    return ctrl.errors ? Object.keys(ctrl.errors): [];
  }
}
