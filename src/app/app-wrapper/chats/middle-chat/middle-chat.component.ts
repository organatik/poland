import { Component, OnInit } from '@angular/core';
import {SelectedItemService} from "../../../selected-item.service";
import {ChatService} from "../../../shared/service/chat.service";
import {ProfileService} from "../../../shared/service/profile.service";
declare var  $;
var ws = new WebSocket("wss://chatchatchat.ml/ws-api/", "protocolOne");
var ws1 = new WebSocket("wss://chatchatchat.ml/ws-api/local-chat-listen");
var ws2 = new WebSocket("wss://chatchatchat.ml/ws-api/global-chat-listen");

var callbacks = {};

ws2.onmessage = function(e) {
  console.log(e.data);
  var m = JSON.parse(e.data);
  callbacks[m.id](JSON.parse(m.payload));
  delete callbacks[m.id];
};
ws1.onmessage = function(e) {
  console.log(e.data);
  var m = JSON.parse(e.data);
  callbacks[m.id](JSON.parse(m.payload));
  delete callbacks[m.id];
};
ws.onmessage = function(e) {
  console.log(e.data);
  var m = JSON.parse(e.data);
  callbacks[m.id](JSON.parse(m.payload));
  delete callbacks[m.id];
};
var call = function(path, msg, callback) {
  var id = 'r' + Math.random();
  callbacks[id] = callback;
  ws.send(JSON.stringify({
    id: id,
    path: path,
    payload: JSON.stringify(msg),
  }));
}

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
  chatMessagesNoRevert = [];
  profile;
  res;

  selectText(index) {
    this.selectedText = this.messages[index];
  }

  constructor(private item: SelectedItemService, private chatService: ChatService, private profileService: ProfileService) {
    this.item.changeEvent.subscribe(selectedItem => {
      this.selectedItem = selectedItem;
      this.getChatData();

      // setTimeout(() => {
      //   console.log(this.selectedItem)
      //   call("local-chat-listen", {}, function(res) {
      //     alert(res.text);
      //   });
      //   call("local-chat-listen", {
      //       session_id: this.profile.session_id,
      //       user_id: this.profile.user_id,
      //       another_user_id: this.selectedItem.another_user.user_id,
      //       // rev: this.profile
      //     }
      //     , function(res) {
      //       alert(res.text);
      //     });
      // }, 5222);
    });

    this.profileService.getProfile().subscribe((data: any) => {
      this.profile = data.profile;
      console.log(this.profile)
    })
  }

  ngOnInit() {

    // setInterval(() => {
    //   this.getChatData();
    // }, 10000);
  }
  older_messages_token;
  canRead = true;
  total_number_of_messages;
  getChatData(){
    if(this.selectedItem)
    this.chatService.chatInfo(this.selectedItem.another_user.user_id).subscribe((res: any) => {
      this.chatMessagesNoRevert = res.chat_messages.slice();
      this.chatMessages = res.chat_messages.reverse().slice();
      console.log(res);
      this.res = res;
      this.older_messages_token = res.older_messages_token;
      this.total_number_of_messages   = res.total_number_of_messages;
      setTimeout(() => {
        document.getElementById('body-chat').scrollBy(0, 500);
        $('#body-chat').scroll(() => {
          var height = $('#body-chat').scrollTop();
         if(height === 0 && this.chatMessages.length < this.total_number_of_messages && this.canRead){
           this.canRead = false;
           this.readMore();
         }
        });
      },100)

    });
  }
  readMore(){
    this.chatService.chatInfo(this.selectedItem.another_user.user_id, this.older_messages_token).subscribe((res: any) => {
      this.chatMessages = [...this.chatMessagesNoRevert, ...res.chat_messages].reverse().slice();
      this.chatMessagesNoRevert = [...this.chatMessagesNoRevert, ...res.chat_messages].slice();
      this.older_messages_token = res.older_messages_token;
      this.total_number_of_messages   = res.total_number_of_messages;
      this.canRead = true;

    });
  }

  send(){
    if(this.selectedItem && this.selectedText)
      this.chatService.chatSend(this.selectedItem.another_user.user_id, this.selectedItem.answers[0].answer_id, this.selectedText).subscribe((data) => {
       this.getChatData();
        this.selectedText = "";
      });
  }
}
