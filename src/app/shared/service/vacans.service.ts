import {EventEmitter, Injectable} from '@angular/core';
import {apiUrl, AuthGuard} from "./guard.service";
import {HttpClient} from "@angular/common/http";
import {ProfileService} from "./profile.service";

@Injectable()
export class VacansService {

  refreshEvent = new EventEmitter();

  constructor(private http: HttpClient, private authGuard: AuthGuard, private profileService: ProfileService) { }

  createVac(advert){
    let obj = this.authGuard.getCredentials();
    advert.adverter_id = obj.user_id;

    obj.advert = advert;

    return this.http.post(apiUrl + 'advert', obj);
  }
  getVac(){
    let obj = this.authGuard.getCredentials();
    obj.target_id = obj.user_id;
    obj.also_closed = true;
    return this.http.post(apiUrl + 'user-adverts', obj);
  }
  closeVac(advert){
    console.log(advert)
    let obj = this.authGuard.getCredentials();
    obj.advert_id = advert.advert_id;
    obj.location = advert.advert.location ||  "";

    return this.http.post(apiUrl + 'close-advert', this.authGuard.getCredentials());
  }

  removeVac(advert){
    console.log(advert)
    let obj = this.authGuard.getCredentials();
    obj.advert_id = advert.advert_id;
    // obj.location = advert.advert.location ||  "";

    return this.http.post(apiUrl + 'remove-advert', this.authGuard.getCredentials());
  }
}
