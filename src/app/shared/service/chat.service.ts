import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiUrl, AuthGuard} from "./guard.service";

@Injectable()
export class ChatService {

  constructor(private http: HttpClient, private authGuard: AuthGuard) { }

  myChats(){
    return this.http.post(apiUrl + 'my-chats', this.authGuard.getCredentials());
  }

  chatInfo(another_user_id, older_messages_token?){
    let obj = this.authGuard.getCredentials();
    obj.another_user_id = another_user_id;
    if(older_messages_token){
      obj.older_messages_token = older_messages_token;
    } else {
      delete obj.older_messages_token;
    }

    return this.http.post(apiUrl + 'chat-info', obj);
  }
  chatSend(another_user_id, answer_id, text){
    let obj = this.authGuard.getCredentials();
    obj.another_user_id = another_user_id;
    obj.answer_id = answer_id;
    obj.text = text;
    return this.http.post(apiUrl + 'chat-send', obj);
  }
}

