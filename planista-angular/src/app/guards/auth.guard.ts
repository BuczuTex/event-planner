import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, CanActivate, ActivatedRouteSnapshot, CanActivateChild} from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {

  }

  canActivate(route: ActivatedRouteSnapshot) {
    const role = this.auth.getRoleFromToken();
    const routeRole = route.data['role'] as string;

    if(this.auth.loggedIn() && routeRole === role) {
      return true;
    }

    this.router.navigate(["/"]);
    this.snackBar.open("Brak dostępu do strony.", "", {
      duration: 4000
    });

    return false;
  }
  canActivateChild(route: ActivatedRouteSnapshot){
    const role = this.auth.getRoleFromToken();
    const routeRole = route.data['role'] as string;

    if(this.auth.loggedIn() && routeRole === role) {
      return true;
    }

    this.router.navigate(["/"]);
    this.snackBar.open("Brak dostępu do strony.", "", {
      duration: 4000
    });

    return false;
  }
}