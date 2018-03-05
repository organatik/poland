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
  avatar_url = new FormControl('');

  skills = new FormControl();
  skillsList = [];
  showDropdawnA = false;
  showDropdawnB = false;
  selectedCountry = 0;
  selectedEducation = 0;

  profile = {
    name: "",
    birth_date: new Date(),
    avatar_url: "",
    country: "",
    education: "",
    skills: [],
  };
  countries = [
    {
      'tag': 'UA',
      'country': 'Украина'
    },
    {
      'tag': 'RU',
      'country': 'Россия'
    },
    {
      'tag': 'ENG',
      'country': 'Англия'
    },
    {
      'tag': 'FR',
      'country': 'Франция'
    },
  ];
  educationList = [
    'choise 1',
    'choise 2',
    'choise 3',
    'choise 4',
  ]

  constructor(private profileService: ProfileService) {
    this.profileService.getProfile().subscribe((data: any) => {
      console.log(data);
      this.name = new FormControl(data.profile.name);
      if(data.profile.birth_date)
      this.bday = new FormControl(data.profile.birth_date);
      if(data.profile.country)
      this.country = new FormControl(data.profile.country);
      if(data.profile.education)
        this.education = new FormControl(data.profile.education);
      if(data.profile.avatar_url){
        this.avatar_url = new FormControl(data.profile.avatar_url);
        this.profile.avatar_url = data.profile.avatar_url;
      }
      if(data.profile.skills && data.profile.skills.length)
        this.skillsList = data.profile.skills;
    })
  }

  selectCountry(index) {
    this.selectedCountry = index;
  }
  selectEducation(index) {
    this.selectedEducation = index;
}
  edit() {
    this.editable = true;
  }
  save() {
    if(this.name.value)
      this.profile.name = this.name.value;
    if(this.avatar_url.value)
      this.profile.avatar_url = this.avatar_url.value;
    if(this.bday.value)
      this.profile.birth_date = new Date(this.bday.value);
    if(this.country.value)
      this.profile.country = this.country.value;
    if(this.education.value)
      this.profile.education = this.education.value ;
    if(this.skillsList && this.skillsList.length)
      this.profile.skills = this.skillsList;

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
