import { Component, OnInit } from '@angular/core';

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
      rating: '★★★☆☆'
    },
    {
      name: 'Anton',
      surname: 'Pupkin',
      age: 25,
      time: '22:55',
      country: 'Ukraine',
      lastMessage: 'Hello! How are you?',
      avatarUrl: '../../../../assets/avatar.png',
      rating: '★★★☆☆'
    },
    {
      name: 'Anton',
      surname: 'Pupkin',
      age: 25,
      time: '22:55',
      country: 'Ukraine',
      lastMessage: 'Hello! How are you?',
      avatarUrl: '../../../../assets/avatar.png',
      rating: '★★★☆☆'
    },
    {
      name: 'Anton',
      surname: 'Pupkin',
      age: 25,
      time: '22:55',
      country: 'Ukraine',
      lastMessage: 'Hello! How are you?',
      avatarUrl: '../../../../assets/avatar.png',
      rating: '★★★☆☆'
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
