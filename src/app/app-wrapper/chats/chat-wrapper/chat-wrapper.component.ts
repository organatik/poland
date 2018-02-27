import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../../shared/service/chat.service";

@Component({
  selector: 'app-chat-wrapper',
  templateUrl: './chat-wrapper.component.html',
  styleUrls: ['./chat-wrapper.component.sass']
})
export class ChatWrapperComponent implements OnInit {
  chatsUser = [
    {
      name: 'Anton',
      surname: 'Pupkin',
      age: 25,
      time: '22:55',
      country: 'Ukraine',
      lastMessage: 'Hello! How are you?',
      avatarUrl: '../../../../assets/avatar.png',
      rating: '★★★☆☆',
      education: 'Высшее техническое',
      aboutme: 'Сварщик 3-го разряда'
    },
    {
      name: 'Anton',
      surname: 'Pupkin',
      age: 25,
      time: '22:55',
      country: 'Ukraine',
      lastMessage: 'Hello! How are you?',
      avatarUrl: '../../../../assets/avatar.png',
      rating: '★★★☆☆',
      education: 'Высшее техническое',
      aboutme: 'Сварщик 3-го разряда'
    },
  ];
  constructor(private chatService: ChatService) {
    this.chatService.myChats().subscribe((data: any) => {
      console.log(data);
      this.chatsUser = data.chats;
    });
  }
  ngOnInit() {
  }

}
