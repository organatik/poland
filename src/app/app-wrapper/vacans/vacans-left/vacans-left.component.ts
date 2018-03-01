import { Component, OnInit } from '@angular/core';
import {VacansService} from "../../../shared/service/vacans.service";
import {ProfileService} from "../../../shared/service/profile.service";

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
      hiring_type: 0,
      hashtags: []
    }
  };

  profile;
  constructor(private vacansService: VacansService, private profileService: ProfileService) {
    this.profileService.getProfile().subscribe((data: any) => {
      this.profile = data.profile;
    });
  }

  ngOnInit() {
  }
  showSpiner;
  sabmitPage;
  create(){
    if(this.teg){
      let tegs = this.teg.split("#");
      this.advert.vacancy.hashtags = tegs;
    }

    this.advert.vacancy.hiring_type = +this.advert.vacancy.hiring_type;
    if(this.advert.description)
    this.vacansService.createVac(this.advert).subscribe((data) => {
      console.log(data);
      this.showSpiner = true;
      this.sabmitPage = false;
      setTimeout(() => {
        this.showSpiner = false;
      }, 1000)
      this.vacansService.refreshEvent.emit("");
      this.teg = '';
      this.advert = {
        adverter_id: "",
        location: "",
        description: "",
        geo_position : {
          latitude: 1,
          longitude: 2
        },
        vacancy: {
          background_resource_id: "pink",
          hiring_type: 0,
          hashtags: []
        }
      };
    });
  }

}
