import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../../shared/service/chat.service";

@Component({
  selector: 'app-chat-wrapper',
  templateUrl: './chat-wrapper.component.html',
  styleUrls: ['./chat-wrapper.component.sass']
})
export class ChatWrapperComponent implements OnInit {
  chatsUser = [

  ];
  constructor(private chatService: ChatService) {
    this.chatService.myChats().subscribe((data: any) => {
      console.log(data);
      this.chatsUser = data.chats;
    })
  }

  ngOnInit() {
  }

}
