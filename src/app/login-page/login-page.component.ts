import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder,  Validators } from '@angular/forms';
import {LoginService} from "../shared/service/login.service";
import {wsUrl} from "../shared/service/guard.service";
//
import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';

// connect
var ws = new $WebSocket(wsUrl + 'phone1');


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

  loginForm: FormGroup;
  codeForm: FormGroup;

  createForm() {
    this.loginForm = this.fb.group({
      phoneNumber: ['', Validators.required ] // <--- the FormControl called "name"
    });
    this.codeForm = this.fb.group(({
      code: ['', Validators.required ]
    }));
  }


  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.createForm();
  }

  ngOnInit() {
    ws.send({
      "phone": "32423423"
    }).subscribe(
      (msg)=> {
        console.log("next", msg.data);
      },
      (msg)=> {
        console.log("error", msg);
      },
      ()=> {
        console.log("complete");
      }
    );
  }

  GetCode() {
    this.getCodeShow = false;
    this.acceptCodeShow = true;

    this.loginService.sendPhone(this.phone).subscribe((data) => {
      console.log(data)
    });
  }
  CheckCode() {
    this.getCodeShow = false;
    this.acceptCodeShow = false;
    this.registerShow = true;
  }

}
