import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacansLeftComponent } from './vacans-left.component';

describe('VacansLeftComponent', () => {
  let component: VacansLeftComponent;
  let fixture: ComponentFixture<VacansLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacansLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacansLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
