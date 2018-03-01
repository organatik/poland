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

  UpdateDeliveryStatus(updates){
    let obj = this.authGuard.getCredentials();
    obj.updates = updates;
    return this.http.post(apiUrl + 'update-delivery-status', obj);

    //   string : session_id
  //   string : user_id
  //   updates: [
  //     string : another_user_id
  //   sint64 : last_delivered_id
  //   sint64 : last_read_id
  // ]

  }

  translate(value: any){
    return this.http.get('https://translation.googleapis.com/language/translate/v2?key=AIzaSyBQm-GsYFNWbQciETrTi4P4lZN1gxCJmNc&source=RU&target=PL&q='+ value)
  }
}

