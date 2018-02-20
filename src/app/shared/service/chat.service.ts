import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiUrl, AuthGuard} from "./guard.service";

@Injectable()
export class ChatService {

  constructor(private http: HttpClient, private authGuard: AuthGuard) { }

  myChats(){
    return this.http.post(apiUrl + 'my-chats', this.authGuard.getCredentials());
  }
}

