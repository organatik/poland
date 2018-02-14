import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SelectedItemService {

  private selectedItem = new BehaviorSubject<number>(0);
  currentSelectedItem = this.selectedItem.asObservable();

  changeSelectedItem(number) {
    this.selectedItem.next(number);
  }

  constructor() { }

}
