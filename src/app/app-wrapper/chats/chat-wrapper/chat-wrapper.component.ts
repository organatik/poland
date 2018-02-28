import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../../shared/service/chat.service";

@Component({
  selector: 'app-chat-wrapper',
  templateUrl: './chat-wrapper.component.html',
  styleUrls: ['./chat-wrapper.component.sass']
})
export class ChatWrapperComponent implements OnInit {
  chatsUser;
  constructor(private chatService: ChatService) {
    this.chatService.myChats().subscribe((data: any) => {
      console.log(data);

      this.chatsUser = data.chats.sort(function(a: any, b: any){
        if(!b.last_message && !a.last_message)
          return  0;
        if (!a.last_message)    return 1;
        else if(!b.last_message) return  0;
         return +new Date(b['last_message']['chat_message']['time']) - +new Date(a['last_message']['chat_message']['time']);
      });
    });
  }
  ngOnInit() {
  }

}
