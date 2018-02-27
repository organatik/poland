import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyVacansComponent } from './empty-vacans.component';

describe('EmptyVacansComponent', () => {
  let component: EmptyVacansComponent;
  let fixture: ComponentFixture<EmptyVacansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyVacansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyVacansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
