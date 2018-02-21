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
  selectedItem = {};
  constructor( private item: SelectedItemService) { }

  ngOnInit() {
    // this.item.currentSelectedItem.subscribe(selectedItem => this.selectedItem = selectedItem);
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

}
