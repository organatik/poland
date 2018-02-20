import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";

export const apiUrl = 'http://51.15.65.96:8080/json-api/';
export const wsUrl = 'ws://51.15.65.96:8080/ws-api/';
export const url = 'ws://51.15.65.96:8080/';

@Injectable()
export class AuthGuard implements CanActivate {
  private isLoggedIn = false;
  credentials;

  constructor(private router: Router) {
  }

  setCredentials(credentials) {
    this.credentials = credentials;
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
