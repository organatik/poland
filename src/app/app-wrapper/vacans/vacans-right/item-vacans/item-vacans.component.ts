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
  @Input() profile;
  teg = "";
  ngOnInit() {
    if(this.advert &&  this.advert.advert && this.advert.advert.vacancy &&  this.advert.advert.vacancy.hashtags)
      for(let item of this.advert.advert.vacancy.hashtags){
      if(item)
        this.teg += '#' + item;
      }
  }

  remove(){
    this.vacansService.removeVac(this.advert).subscribe((data) => {
      console.log(data);
      // this.advert = null;

      this.vacansService.refreshEvent.emit("");
    });
  }


  close(){
    this.vacansService.closeVac(this.advert).subscribe((data) => {
      console.log(data);
      this.advert.active = false;
      this.advert.advert.close_time = "d123123"
      // this.vacansService.refreshEvent.emit("");
    });
  }
}
