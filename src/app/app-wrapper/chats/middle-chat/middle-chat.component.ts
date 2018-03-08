import {ApplicationRef, Component, OnInit} from '@angular/core';
import {SelectedItemService} from "../../../selected-item.service";
import {ChatService} from "../../../shared/service/chat.service";
import {ProfileService} from "../../../shared/service/profile.service";
import {AuthGuard} from "../../../shared/service/guard.service";
declare var  $;

var ws = new WebSocket("wss://chatchatchat.ml/ws-api/", "protocolOne");
var callbacks = {};
ws.onmessage = function(e) {
  var m = JSON.parse(e.data);
  callbacks[m.id](JSON.parse(m.payload));
  delete callbacks[m.id];
}
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
  reload = true;

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

  constructor(private item: SelectedItemService, private chatService: ChatService, private profileService: ProfileService,
              private authGuard: AuthGuard, private applicationRef: ApplicationRef) {
    this.item.changeEvent.subscribe(selectedItem => {
      this.selectedItem = selectedItem;
      this.getChatData();

    });

    this.profileService.getProfile().subscribe((data: any) => {
      this.profile = data.profile;
      console.log(this.profile)
    })
  }
  user_id;
  answereruser_id;
  session_id;
  ngOnInit() {

    // setInterval(() => {
    //   this.getChatData();
    // }, 10000);
  }
  older_messages_token;
  canRead = true;
  total_number_of_messages;
  typing_event_state = {
    type: 'NOT_TYPING'
  };
  localChatListen(rev){
    call("local-chat-listen",
      {
        "session_id" : this.session_id,
        "user_id" : this.user_id,
        "another_user_id": this.answereruser_id,
        "rev": rev
      }
      , (res) => {
        for(let item of res.events){
          if(item.typing_event){
            this.typing_event_state.type = item.typing_event.state;
            this.applicationRef.tick()

          }
          if(item.new_message){
            console.log(item.new_message.chat_message, 999999999999999);
            this.chatMessages.push(item.new_message);
            this.chatMessagesNoRevert.unshift(item.new_message);
            // this.getChatData();
            let delivery =[]
                delivery.push({
                  last_read_id: item.new_message.message_id,
                  another_user_id: this.selectedItem.another_user.user_id
                })
            if(delivery.length)
              this.chatService.UpdateDeliveryStatus(delivery).subscribe(()=>{            this.applicationRef.tick()
              });
            this.applicationRef.tick()

          }
        }
        // events[0].typing_event.state === "NOT_TYPING"
        console.log(res, 44444444444);

        this.localChatListen(res.rev);
      });
  }

  lastMessageId;

  getChatData(){
    if(this.selectedItem)
    this.chatService.chatInfo(this.selectedItem.another_user.user_id).subscribe((res: any) => {
      this.reload = false;

      let delivery =[];
      let id = 0;
      for(let item of res.chat_messages){
          if(id < item.message_id){
            id = item.message_id;
          }
      }

      delivery.push({
        last_read_id: id,
        another_user_id: this.selectedItem.another_user.user_id
      })
      console.log(123123123, delivery)
      if(delivery.length)
        this.chatService.UpdateDeliveryStatus(delivery).subscribe(()=>{});




      this.chatMessagesNoRevert = res.chat_messages.slice();
      this.chatMessages = res.chat_messages.reverse().slice();

      for(let item of this.chatMessages){
        if(item.author_id === this.profile.user_id){
          this.lastMessageId = item.message_id
        }
      }

      console.log(res, this.profile);
      let g =this.authGuard.getCredentials();

      this.user_id = g.user_id;
      this.session_id = g.session_id;
      this.answereruser_id = res.answers[0].answerer.user_id;
      setTimeout(() => {
        this.localChatListen(res.rev);
      },3000);
      this.res = res;
      this.older_messages_token = res.older_messages_token;
      this.total_number_of_messages   = res.total_number_of_messages;
      this.reload = true;
      this.applicationRef.tick()

      setTimeout(() => {
        this.applicationRef.tick()

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

  hasType = 1;

  type(e){
    console.log(123, e)
      this.chatService.chatSend(this.selectedItem.another_user.user_id, this.selectedItem.answers[0].answer_id, this.selectedText, e).subscribe((data) => {

      });

  }

  translate(){
    // for(let item: any of this.chatMessages){
    //   this.chatService.translate(item.chat_message.text).subscribe((data: any)=> {
    //     if(data.data.translations && data.data.translations[0])
    //     console.log(data.data.translations[0].translatedText)
    //   });
    // }

  }
}
