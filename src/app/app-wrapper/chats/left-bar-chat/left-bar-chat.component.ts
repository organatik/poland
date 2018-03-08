import {ApplicationRef, Component, Injectable, Input, OnInit} from '@angular/core';
import {SelectedItemService} from '../../../selected-item.service';
import {VacansService} from "../../../shared/service/vacans.service";
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
  selector: 'app-left-bar-chat',
  templateUrl: './left-bar-chat.component.html',
  styleUrls: ['./left-bar-chat.component.sass']
})
@Injectable()
export class LeftBarChatComponent implements OnInit {
  @Input() users;
  usersCopy = [];
  selectedItem = {};
  epty = [{}, {},{},{},{}];
  constructor( private item: SelectedItemService, private applicationRef: ApplicationRef, private vacansService: VacansService) {
    // item.globalChange.subscribe(()=>{
    //   this.applicationRef.tick()
    //   this.usersCopy = this.users.slice();
    // })
  }
  sort = {

  };
  keys = [];
  lable = 'Все';
  sortNmae = 'all'
  ngOnInit() {
    setInterval(() => {
      this.applicationRef.tick()
      this.usersCopy = this.users.slice();
      this.sortBy(this.sortNmae);
    }, 2222);
    this.usersCopy = this.users.slice();
    // this.item.currentSelectedItem.subscribe(selectedItem => this.selectedItem = selectedItem);
    // answers[0].answer.  description answerer_id
    for(let item of this.users){
      // console.log(item.answers[0].advert.description)
      // console.log(item.answers[0].answer.advert_id);
      if(item.answers[0] && item.answers[0].advert && this.sort[item.answers[0].advert.description]){
        this.sort[item.answers[0].advert.description] += 1;
      } else {
        if(item.answers[0] && item.answers[0].advert)
        this.sort[item.answers[0].advert.description] = 1;
      }
    }
    let keys = []
    this.vacansService.getVac().subscribe((data: any) => {
      console.log(data.adverts, 1111)
      // this.adverts = [];advert.description
      for(let item of data.adverts){
        this.keys.push(item.advert.description)
      }
      // console.log(this.sort, this.keys, keys);

    });
    // this.keys = Object.keys(this.sort);

  }
  newSelectedItem(obj) {
    this.item.changeEvent.emit(obj);
    this.selectedItem = obj;
  }

  calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - new Date(birthday).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  today(date){
    let today = new Date().getDate();
    let todayS = new Date(date).getDate();
    // console.log(today, todayS)
    return today === todayS;
  }

  sortBy(name){
    if(name === 'all'){
      this.usersCopy = this.users.slice();

      return;
    }
    this.usersCopy = this.users.filter((e) => {
      return e.answers[0].advert.description === name;
    });
  }

  // localChatListen(rev){
  //   call("global-chat-listen",
  //     {
  //       "session_id" : this.obj.session_id,
  //       "user_id" : this.obj.user_id,
  //       "rev": rev
  //     }
  //     , (res) => {
  //       console.log(res)
  //       this.applicationRef.tick()
  //
  //
  //       this.localChatListen(res.rev);
  //     });
  // }

}
