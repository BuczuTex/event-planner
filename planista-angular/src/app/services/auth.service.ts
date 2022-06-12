//TODO: Token refreshing
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { User, UserRoles } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url : string = "https://localhost:7290/api/auth";

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar, 
    private jwtHelper: JwtHelperService) {

  }

  login(data: any) {
    const credentials = JSON.stringify(data);
    return this.http.post(this.url + "/login", credentials, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Expose-Headers": "Authentication"
      },
      observe: "response"
    });
  }

  register(data: User) {
    const credentials = JSON.stringify(data).replace(/[_]/g, "");
    return this.http.post<string>(this.url + "/register", credentials, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }

  loggedIn() {
    const token = localStorage.getItem("token");

    if(token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  }

  isTokenValid() {
    const token: string = localStorage.getItem("token");
    if(token && this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  getRoleFromToken(): string { 
    const token : string = localStorage.getItem("token");
    const decodedToken = this.jwtHelper.decodeToken(token);

    return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }
}
