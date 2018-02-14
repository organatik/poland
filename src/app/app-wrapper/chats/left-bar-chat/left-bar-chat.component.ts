import {Component, Injectable, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-left-bar-chat',
  templateUrl: './left-bar-chat.component.html',
  styleUrls: ['./left-bar-chat.component.sass']
})
@Injectable()
export class LeftBarChatComponent implements OnInit {
  @Input() users;
  selectedItem;
  constructor() { }
  selectItem(index) {
    this.selectedItem = index;
  }



  ngOnInit() {
  }

}
