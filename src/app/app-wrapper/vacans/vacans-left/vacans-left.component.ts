import { Component, OnInit } from '@angular/core';
import {VacansService} from "../../../shared/service/vacans.service";

@Component({
  selector: 'app-vacans-left',
  templateUrl: './vacans-left.component.html',
  styleUrls: ['./vacans-left.component.sass']
})
export class VacansLeftComponent implements OnInit {
  teg = "";
  advert = {
    adverter_id: "",
    location: "",
    description: "",
    geo_position : {
      latitude: 1,
      longitude: 2
    },
    vacancy: {
      background_resource_id: "pink",
      work_type: 0,
      hashtags: []
    }


};

  constructor(private vacansService: VacansService) { }

  ngOnInit() {
  }

  create(){
    if(this.teg){
      let tegs = this.teg.split("#");
      this.advert.vacancy.hashtags = tegs;
    }
    this.vacansService.createVac(this.advert).subscribe((data) => {
      console.log(data)
    });
  }

}
