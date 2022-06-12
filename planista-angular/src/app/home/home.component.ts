import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthService, private snackBar: MatSnackBar, private title: Title) {}

  loggedIn() {
    return this.auth.loggedIn();
  }

  logout() {
    this.snackBar.open("Pomyślnie wylogowano.", "Zamknij");
    this.auth.logout();
  }
  
  ngOnInit(): void {
      this.title.setTitle("Aplikacja Planista");
  }
}