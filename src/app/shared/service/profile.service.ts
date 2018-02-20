import { Injectable } from '@angular/core';
import {apiUrl, AuthGuard} from "./guard.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient, private authGuard: AuthGuard) {
    this.getProfile().subscribe((data) => {
      console.log(data);
    })
  }

  getProfile() {
    return this.http.post(apiUrl + 'profile', this.authGuard.getCredentials());
  }


  setProfile(profile) {
    let obj = this.authGuard.getCredentials();
    profile.adverter_id = obj.user_id;

    obj.profile = profile;
    return this.http.post(apiUrl + 'set-profile', obj);
  }
}
