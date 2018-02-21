import { Component, OnInit } from '@angular/core';
import {SelectedItemService} from "../../../selected-item.service";
import {ChatService} from "../../../shared/service/chat.service";
import {ProfileService} from "../../../shared/service/profile.service";

@Component({
  selector: 'app-middle-chat',
  templateUrl: './middle-chat.component.html',
  styleUrls: ['./middle-chat.component.sass']
})
export class MiddleChatComponent implements OnInit {
  selectedItem: any;

  messages = [
    'Приежайте на роботу!',
    'Сдесь можно посмотреть информацию о факультете!',
    'Могу отправить информацию позже'
  ];
  selectedText;
  chatMessages = [];
  profile;

  selectText(index) {
    this.selectedText = this.messages[index];
  }

  constructor(private item: SelectedItemService, private chatService: ChatService, private profileService: ProfileService) {
    this.item.changeEvent.subscribe(selectedItem => {
      this.selectedItem = selectedItem;
      this.getChatData();
    });

    this.profileService.getProfile().subscribe((data: any) => {
      this.profile = data.profile;
      console.log(this.profile)
    })
  }

  ngOnInit() {
    setInterval(() => {
      this.getChatData();
    }, 10000);
  }

  getChatData(){
    if(this.selectedItem)
    this.chatService.chatInfo(this.selectedItem.another_user.user_id).subscribe((res: any) => {
      this.chatMessages = res.chat_messages;
    });
  }

  send(){
    console.log(this.selectedItem)
    if(this.selectedItem)
    this.chatService.chatSend(this.selectedItem.another_user.user_id, this.selectedItem.answers[0].answer_id, this.selectedText).subscribe((data) => {
     this.getChatData();
    })
  }
}
