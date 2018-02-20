import { Injectable } from '@angular/core';
import {Http, RequestOptions} from "@angular/http";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {apiUrl, wsUrl} from "./guard.service";

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  sendPhone(phone){
    return this.http.post(apiUrl + 'phone1', {phone: phone.toString()});
  }

  checkCode(phone, code, challenge_id){
    return this.http.post(apiUrl + 'login3', {phone: phone.toString(), code: code.toString(), challenge_id: challenge_id.toString()});
  }

  reg(phone, registration_token, name){
    return this.http.post(apiUrl + 'register3', {phone: phone.toString(), registration_token: registration_token.toString(), name: name.toString()});
  }

  debug(){
    return this.http.post(apiUrl + 'debug-listen-sms', {});
  }

}
