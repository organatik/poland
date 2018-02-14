import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacansComponent } from './vacans.component';

describe('VacansComponent', () => {
  let component: VacansComponent;
  let fixture: ComponentFixture<VacansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
