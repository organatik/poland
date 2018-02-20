import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vacans-right',
  templateUrl: './vacans-right.component.html',
  styleUrls: ['./vacans-right.component.sass']
})
export class VacansRightComponent implements OnInit {

  constructor() { }

  @Input() adverts;

  ngOnInit() {
  }

}
