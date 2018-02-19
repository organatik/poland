import { Injectable } from '@angular/core';
import {Http, RequestOptions} from "@angular/http";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {apiUrl} from "./guard.service";

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  sendPhone(phone){

    return this.http.post(apiUrl + 'phone1', {phone: phone.toString()},
      {
        // params: new HttpParams().set('id', '56784'),
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
      );
  }

}
