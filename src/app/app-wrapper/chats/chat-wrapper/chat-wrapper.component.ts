import {ApplicationRef, Component, OnInit} from '@angular/core';
import {ChatService} from "../../../shared/service/chat.service";
import {AuthGuard} from "../../../shared/service/guard.service";
import {SelectedItemService} from "../../../selected-item.service";
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
  selector: 'app-chat-wrapper',
  templateUrl: './chat-wrapper.component.html',
  styleUrls: ['./chat-wrapper.component.sass']
})
export class ChatWrapperComponent implements OnInit {
  chatsUser;
  obj;
  rev
  constructor(private chatService: ChatService, private authGuard: AuthGuard, private applicationRef: ApplicationRef, private selectedItemService:SelectedItemService) {
    this.getData();
  }
  ngOnInit() {
    setTimeout(()=>{
      this.localChatListen(this.rev);
    }, 3000)


  }

  getData(){
    this.chatService.myChats().subscribe((data: any) => {
      let chats = data.chats.filter((f) => {
        return f.answers.length;
      });
      console.log(data, data.chats, chats);
      this.obj = this.authGuard.getCredentials();
      this.rev = data.rev;

      let delivery = [];
      for(let item of chats){
        if(item.last_message){
          delivery.push({
            last_delivered_id: item.last_message.message_id,
            another_user_id: item.another_user.user_id
          })

        }
      }

      this.chatService.UpdateDeliveryStatus(delivery).subscribe(()=>{});
      this.applicationRef.tick()
      this.chatsUser = chats.sort(function(a: any, b: any){
        if(!b.last_message && !a.last_message)
          return  0;
        if (!a.last_message)    return 1;
        else if(!b.last_message) return  0;
        return +new Date(b['last_message']['chat_message']['time']) - +new Date(a['last_message']['chat_message']['time']);
      });
      setTimeout(()=>{
        this.applicationRef.tick()

        this.selectedItemService.globalChange.emit("");

      }, 2000)

    });
  }
  localChatListen(rev){
    call("global-chat-listen",
      {
        "session_id" : this.obj.session_id,
        "user_id" : this.obj.user_id,
        "rev": rev
      }
      , (res) => {
       console.log(res)
        let delivery =[]
        for(let item of res.events){
          if(item.last_message){
            delivery.push({
              last_delivered_id: item.last_message.message_id,
              another_user_id: item.another_user.user_id
            })

          }
        }
        if(delivery.length)
        this.chatService.UpdateDeliveryStatus(delivery).subscribe(()=>{    this.getData();
          this.applicationRef.tick();
        });

        this.localChatListen(res.rev);
      });
  }
}
