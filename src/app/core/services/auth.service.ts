import { APIConfig } from 'src/configurations/api-config';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from "@angular/router";


@Injectable()
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    public http: HttpClient , private router: Router
  ) { }

  login(user): Observable<Response> {
    let url = APIConfig.login.url;
    return this.http.post<Response>(
      url, {
        email: user.email,
        password: user.password
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/']);
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

}
