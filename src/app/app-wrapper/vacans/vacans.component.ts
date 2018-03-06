import {ApplicationRef, Component, OnInit} from '@angular/core';
import {VacansService} from "../../shared/service/vacans.service";

@Component({
  selector: 'app-vacans',
  templateUrl: './vacans.component.html',
  styleUrls: ['./vacans.component.sass']
})
export class VacansComponent implements OnInit {
  adverts = [];
  constructor(private vacansService: VacansService, private applicationRef: ApplicationRef) {
    this.vacansService.refreshEvent.subscribe((data) => {
      this.getData();
    });
    this.getData();
  }
  refresh = true;
  ngOnInit() {
  }
  getData(){
    this.vacansService.getVac().subscribe((data: any) => {
      console.log(data)
      // this.adverts = [];
      this.refresh = false;
      this.adverts = data.adverts.slice();

      setTimeout(() => {
        this.refresh = true;
        this.applicationRef.tick()

      },10)
    });
  }
}
