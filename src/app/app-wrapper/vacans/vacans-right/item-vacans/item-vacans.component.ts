import {Component, Input, OnInit} from '@angular/core';
import {VacansService} from "../../../../shared/service/vacans.service";

@Component({
  selector: 'app-item-vacans',
  templateUrl: './item-vacans.component.html',
  styleUrls: ['./item-vacans.component.sass']
})
export class ItemVacansComponent implements OnInit {

  constructor(private vacansService: VacansService) { }

  @Input() advert;

  ngOnInit() {
  }

  remove(){
    this.vacansService.closeVac(this.advert).subscribe((data) => {
      console.log(data)
    })
  }

}
