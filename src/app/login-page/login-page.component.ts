import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder,  Validators } from '@angular/forms';
import {LoginService} from "../shared/service/login.service";
import {AuthGuard, url, wsUrl} from "../shared/service/guard.service";
import {Router} from "@angular/router";

var ws = new WebSocket("wss://chatchatchat.ml/ws-api/", "protocolOne");
var callbacks = {};
ws.onmessage = function(e) {
  console.log(e.data);
  var m = JSON.parse(e.data);
  callbacks[m.id](JSON.parse(m.payload));
  delete callbacks[m.id];
}
var call = function(path, msg, callback) {
  var id = 'r' + Math.random();
  callbacks[id] = callback;
  ws.send(JSON.stringify({
    id: id,
    path: path,
    payload: JSON.stringify(msg),
  }));
}

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
  code;
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
    // setTimeout(() => {
    //   call("debug-listen-sms", {}, function(res) {
    //     alert(res.text);
    //   });
    //   call("phone1", {phone: "34324234234"}, function(res) {
    //     alert(res.text);

    //   });
    // }, 2222);
  }

  GetCode() {
    this.getCodeShow = false;
    this.acceptCodeShow = true;

    this.loginService.sendPhone(this.phone).subscribe((data: any) => {
      console.log(data);
      this.challenge_id = data.challenge_id;
      this.code = 111111;

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
    });
  }


}
