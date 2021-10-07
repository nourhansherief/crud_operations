
import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, take, map } from 'rxjs/operators';
import { AuthService } from "src/app/core/services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authenticationService: AuthService, private router: Router) { 
  }


  canActivate(): Observable<boolean> {
    // check if user is not logged in redirect to login page
    return this.authenticationService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => !!isLoggedIn),
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}

