import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../shared/service/profile.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {
  profile;
  constructor(private profileService: ProfileService) {
    this.profileService.getProfile().subscribe((data:any) => {
      console.log(data.profile);
      this.profile = data.profile;
    })
  }

  ngOnInit() {
  }

}
