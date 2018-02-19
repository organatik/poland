import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";

export const apiUrl = 'http://51.15.65.96:8080/json-api/';
export const wsUrl = 'ws://51.15.65.96:8080/ws-api/';

@Injectable()
export class AuthGuard implements CanActivate {
  private isLoggedIn = false;

  constructor(private router: Router) {
  }

  canActivate() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
