import { Component, OnInit } from '@angular/core';
import {VacansService} from "../../shared/service/vacans.service";

@Component({
  selector: 'app-vacans',
  templateUrl: './vacans.component.html',
  styleUrls: ['./vacans.component.sass']
})
export class VacansComponent implements OnInit {
  adverts = [];
  constructor(private vacansService: VacansService) {
    this.vacansService.getVac().subscribe((data: any) => {
      console.log(data)
      this.adverts = data.adverts;
    })
  }

  ngOnInit() {
  }

}
