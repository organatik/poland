import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import {ProfileService} from "../../shared/service/profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  editable = false;
  name = new FormControl('');
  bday = new FormControl('');
  country = new FormControl('');
  education = new FormControl('');
  skills = new FormControl();
  skillsList = [];

  profile = {
    name: "",
    birth_date: new Date(),
    avatar_url: "",
    country: "",
    education: "",
    skills: [],
  }

  constructor(private profileService: ProfileService) {
    this.profileService.getProfile().subscribe((data: any) => {
      console.log(data);
      this.name = new FormControl(data.profile.name);
      if(data.birth_date)
      this.bday = new FormControl(data.profile.birth_date);
      if(data.country)
      this.country = new FormControl(data.profile.country);
      if(data.education)
        this.education = new FormControl(data.profile.education);
      if(data.skills && data.skills.length)
        this.skillsList = data.profile.skills;
    })
  }



  edit() {
    this.editable = true;
  }
  save() {
    if(this.name.value)
      this.profile.name = this.name.value;

    this.profileService.setProfile(this.profile).subscribe((data) => {
      console.log(data)
    });
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
