import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-middle-chat',
  templateUrl: './middle-chat.component.html',
  styleUrls: ['./middle-chat.component.sass']
})
export class MiddleChatComponent implements OnInit {

  messages = [
    'Приежайте на роботу!',
    'Сдесь можно посмотреть информацию о факультете!',
    'Могу отправить информацию позже'
  ];
  selectedText;

  selectText(index) {
    this.selectedText = index;
  }

  constructor() { }

  ngOnInit() {
  }

}
