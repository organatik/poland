import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacansRightComponent } from './vacans-right.component';

describe('VacansRightComponent', () => {
  let component: VacansRightComponent;
  let fixture: ComponentFixture<VacansRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacansRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacansRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
