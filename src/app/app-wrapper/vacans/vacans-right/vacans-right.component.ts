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

  ngOnInit() {
    this.profileService.getProfile().subscribe((data: any) => {
      this.profile = data.profile;
    });
  }

}
