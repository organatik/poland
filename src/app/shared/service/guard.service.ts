import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";

// export const url = 'ws://51.15.65.96:8080/';
// export const apiUrl = 'http://51.15.65.96:8080/json-api/';
// export const wsUrl = 'ws://51.15.65.96:8080/ws-api/';
  export const url = 'wss://chatchatchat.ml/';
export const apiUrl = 'https://chatchatchat.ml/json-api/';
export const wsUrl = 'ws://51.15.65.96:8080/ws-api/';
@Injectable()
export class AuthGuard implements CanActivate {
  private isLoggedIn = false;
  credentials;

  constructor(private router: Router) {
    let c = localStorage.getItem('credentials');
    console.log(c);
    if(c && c !== 'undefined'){
      this.setCredentials(JSON.parse(c));
    }
  }

  setCredentials(credentials) {
    this.credentials = credentials;
    localStorage.setItem('credentials', JSON.stringify(credentials));
  }

  getCredentials(){
    return this.credentials;
  }

  canActivate() {
    if (!this.credentials) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
