import {EventEmitter, Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SelectedItemService {

  changeEvent = new EventEmitter();
  globalChange = new EventEmitter();

  constructor() { }

}
