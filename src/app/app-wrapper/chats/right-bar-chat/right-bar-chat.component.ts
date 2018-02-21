import {Component, Input, OnInit} from '@angular/core';
import {SelectedItemService} from '../../../selected-item.service';

@Component({
  selector: 'app-right-bar-chat',
  templateUrl: './right-bar-chat.component.html',
  styleUrls: ['./right-bar-chat.component.sass']
})
export class RightBarChatComponent implements OnInit {
  selectedItem;
  @Input() users;

  constructor( private item: SelectedItemService ) { }



  ngOnInit() {
    this.item.changeEvent.subscribe(selectedItem => {this.selectedItem = selectedItem; console.log(selectedItem)});

  }
  calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - new Date(birthday).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
