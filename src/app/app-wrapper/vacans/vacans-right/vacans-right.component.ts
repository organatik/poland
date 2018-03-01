import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from "../../../shared/service/profile.service";

@Component({
  selector: 'app-vacans-right',
  templateUrl: './vacans-right.component.html',
  styleUrls: ['./vacans-right.component.sass']
})
export class VacansRightComponent implements OnInit {
  profile;
  constructor(private profileService: ProfileService) { }

  @Input() adverts;

  today = [];
  thisMonth = [];
  advertsObj = []
  label = 'Все вакансии за сегодня';

  ngOnInit() {
    this.advertsObj = this.adverts;
    this.profileService.getProfile().subscribe((data: any) => {
      this.profile = data.profile;
      for(let item of this.adverts){
        let date = new Date(item.advert.open_time).getDate();
        let month = new Date(item.advert.open_time).getMonth();
        let nowday = new Date().getDate();
        let nowMonth = new Date().getMonth();
        if(nowMonth === month){
          if(date === nowday)
            this.today.push(item);
          this.thisMonth.push(item);
        }
        console.log(this.today, date === nowday && nowMonth === month)
      }
    });
  }

}
