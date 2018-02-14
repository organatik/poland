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
      rating: '★★★☆☆',
      education: 'Высшее техническое',
      aboutme: 'Строитель со стажем'
    },
    {
      name: 'Паша',
      surname: 'Pupkin',
      age: 25,
      time: '22:55',
      country: 'Ukraine',
      lastMessage: 'Hello! How are you?',
      avatarUrl: '../../../../assets/images.jpeg',
      rating: '★★★☆☆',
      education: 'Среднее техническое',
      aboutme: 'Сварщик 3-го разряда'
    },
    {
      name: 'Анатолий',
      surname: 'Pupkin',
      age: 25,
      time: '22:55',
      country: 'Польща',
      lastMessage: 'Hello! How are you?',
      avatarUrl: '../../../../assets/images.jpeg',
      rating: '★★★☆☆',
      education: 'Высшее техническое',
      aboutme: 'Пицейола со стажем'
    },
    {
      name: 'Anton',
      surname: 'Pupkin',
      age: 25,
      time: '22:55',
      country: 'Англия',
      lastMessage: 'Hello! How are you?',
      avatarUrl: '../../../../assets/avatar.png',
      rating: '★★★☆☆',
      education: 'Высшее техническое',
      aboutme: 'Маляр 3-го разряда'
    },
    {
      name: 'Саша',
      surname: 'Pupkin',
      age: 22,
      time: '22:55',
      country: 'Америка',
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
  constructor() { }

  ngOnInit() {
  }

}
