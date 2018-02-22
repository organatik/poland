import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder,  Validators } from '@angular/forms';
import {LoginService} from "../shared/service/login.service";
import {AuthGuard, url, wsUrl} from "../shared/service/guard.service";
//
import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';
import {Router} from "@angular/router";
declare var SockJS;
// connect
// var ws = new $WebSocket(url + 'ws-api/debug-listen-sms');
// "/json-api/debug-listen-sms



// var sock = new SockJS(url + 'ws-api/debug-listen-sms');
// sock.onopen = function() {
//   console.log('open');
//   sock.send('test');
// };
//
// sock.onmessage = function(e) {
//   console.log('message', e.data);
//   sock.close();
// };
//
// sock.onclose = function() {
//   console.log('close');
// };

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit {
  getCodeShow = true;
  acceptCodeShow = false;
  registerShow = false;
  phone = 80669461305;
  challenge_id;
  code = 111111;
  name = "";
  registration_token = "";
  loginForm: FormGroup;
  codeForm: FormGroup;
  nameForm: FormGroup;

  createForm() {
    this.loginForm = this.fb.group({
      phoneNumber: ['', Validators.required ] // <--- the FormControl called "name"
    });
    this.codeForm = this.fb.group(({
      code: ['', Validators.required ]
    }));
    this.nameForm = this.fb.group(({
      name: ['', Validators.required ]
    }));
  }


  constructor(private fb: FormBuilder, private loginService: LoginService, private authGuard: AuthGuard, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    // ws.onMessage(
    //   (msg: MessageEvent)=> {
    //     console.log("onMessage ", msg.data);
    //   },
    //   {autoApply: false}
    // );
    // ws.getDataStream().subscribe(
    //   (msg)=> {
    //     console.log("next", msg.data);
    //     ws.close(false);
    //   },
    //   (msg)=> {
    //     console.log("error", msg);
    //   },
    //   ()=> {
    //     console.log("complete");
    //   }
    // );
  }

  GetCode() {
    this.getCodeShow = false;
    this.acceptCodeShow = true;

    this.loginService.sendPhone(this.phone).subscribe((data: any) => {
      console.log(data);
      this.challenge_id = data.challenge_id;
      // ws.onMessage(
      //   (msg: MessageEvent)=> {
      //     console.log("onMessage ", msg.data);
      //   },
      //   {autoApply: false}
      // );
      // ws.getDataStream().subscribe(
      //   (msg)=> {
      //     console.log("next", msg.data);
      //     ws.close(false);
      //   },
      //   (msg)=> {
      //     console.log("error", msg);
      //   },
      //   ()=> {
      //     console.log("complete");
      //   }
      // );
    });
  }
  CheckCode() {
    this.loginService.checkCode(this.phone, this.code, this.challenge_id).subscribe((data: any) => {
      console.log(data)
      if(data.not_registered){
        this.registration_token = data.not_registered.registration_token;
        this.getCodeShow = false;
        this.acceptCodeShow = false;
        this.registerShow = true;
      } else {
        this.authGuard.setCredentials(data.credentials);
        this.router.navigate(['/chat']);
      }
    });

  }

  reg() {
    this.loginService.reg(this.phone, this.registration_token, this.name).subscribe((data: any) => {
      console.log(data);
      this.authGuard.setCredentials(data.credentials);
      this.router.navigate(['/chat']);
      //   :
      //   role
      //     :
      //     "adverter"
      // session_id
      //   :
      //   "9ae81c567e6a3246ab225a98e9e269f6"
      // user_id
      //   :
      //   "fb8614bf0acf2f114a02e844134f0543"
    })
  }


}
