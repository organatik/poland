import {Component, Injectable, Input, OnInit} from '@angular/core';
import {SelectedItemService} from '../../../selected-item.service';

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
  constructor( private item: SelectedItemService) { }
  sort = {

  };
  keys = [];
  lable = 'Все';
  ngOnInit() {
    this.usersCopy = this.users.slice();
    // this.item.currentSelectedItem.subscribe(selectedItem => this.selectedItem = selectedItem);
    // answers[0].answer.  description answerer_id
    for(let item of this.users){
      // console.log(item.answers[0].advert.description)
      // console.log(item.answers[0].answer.advert_id);
      if(this.sort[item.answers[0].advert.description]){
        this.sort[item.answers[0].advert.description] += 1;
      } else {
        this.sort[item.answers[0].advert.description] = 1;
      }
    }
    // console.log(this.sort);
    this.keys = Object.keys(this.sort);

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

  sortBy(name){
    if(name === 'all'){
      this.usersCopy = this.users.slice();

      return;
    }
    this.usersCopy = this.users.filter((e) => {
      return e.answers[0].advert.description === name;
    });
  }
}
