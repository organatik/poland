import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit {
  getCodeShow = true;
  acceptCodeShow = false;
  registerShow = false;

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


  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {

  }





  GetCode() {
    this.getCodeShow = false;
    this.acceptCodeShow = true;
  }
  CheckCode() {
    this.getCodeShow = false;
    this.acceptCodeShow = false;
    this.registerShow = true;
  }

}
