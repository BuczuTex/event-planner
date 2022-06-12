import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appRouter: Router;

  constructor(private auth: AuthService, private snackBar: MatSnackBar, private router: Router) {
    this.appRouter = this.router;
  }

  getRoleFromToken() {
    console.log(this.auth.getRoleFromToken());
    return this.auth.getRoleFromToken();
  }
  loggedIn() {
    return this.auth.loggedIn();
  }
  logout() {
    this.snackBar.open("Pomyślnie wylogowano.", "Zamknij");
    this.auth.logout();
  }
}
