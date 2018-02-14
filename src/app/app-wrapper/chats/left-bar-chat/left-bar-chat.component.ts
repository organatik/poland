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
  selectedItem;
  constructor( private item: SelectedItemService) { }
  selectItem(index) {
    this.selectedItem = index;
  }



  ngOnInit() {
    this.item.currentSelectedItem.subscribe(selectedItem => this.selectedItem = selectedItem);
  }
  newSelectedItem() {
    this.item.changeSelectedItem(this.selectedItem);
  }

}
