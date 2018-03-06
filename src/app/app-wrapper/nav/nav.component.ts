import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../shared/service/profile.service";
import {AuthGuard} from "../../shared/service/guard.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {
  profile;
  showLogOut;
  constructor(private profileService: ProfileService, private authGuard: AuthGuard, private router: Router) {
    this.profileService.getProfile().subscribe((data:any) => {
      console.log(data.profile);
      this.profile = data.profile;
    })
  }

  ngOnInit() {
  }
  logOut(){
    this.authGuard.setCredentials(null);
    this.router.navigate(['/login']);
  }

}
