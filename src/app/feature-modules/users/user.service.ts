import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { APIConfig } from "src/configurations/api-config";

@Injectable()
export class UserService  {

  constructor(
    private http: HttpClient,
  ) { }

  public getUsers(pageIndex) {  
    let url  = APIConfig.listUsers.url(pageIndex + 1);
    return this.http.get(url);
  }  

 

}
