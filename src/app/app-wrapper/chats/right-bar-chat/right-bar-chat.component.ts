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
    this.item.currentSelectedItem.subscribe(selectedItem => this.selectedItem = selectedItem);

  }

}
