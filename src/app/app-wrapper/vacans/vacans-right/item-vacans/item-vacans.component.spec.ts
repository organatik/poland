import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemVacansComponent } from './item-vacans.component';

describe('ItemVacansComponent', () => {
  let component: ItemVacansComponent;
  let fixture: ComponentFixture<ItemVacansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemVacansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemVacansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
