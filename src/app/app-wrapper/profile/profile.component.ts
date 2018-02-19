import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  editable = false;
  skillsList = [];
  constructor() { }

  name = new FormControl('Fedex');
  bday = new FormControl('30.05.1995');
  country = new FormControl('Ukraine');
  education = new FormControl('Высшие техническое');
  skills = new FormControl();

  edit() {
    this.editable = true;
  }
  save() {
    this.editable = false;
  }
  addSkill() {
    if (this.skills.value != null) {
      this.skillsList.push(this.skills.value);
    }
    this.skills.reset(null);
  }
  deleteSkill(index) {
    this.skillsList.splice(index, 1);
  }

  ngOnInit() {
  }

}
