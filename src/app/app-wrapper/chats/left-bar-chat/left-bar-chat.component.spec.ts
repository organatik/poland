import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftBarChatComponent } from './left-bar-chat.component';

describe('LeftBarChatComponent', () => {
  let component: LeftBarChatComponent;
  let fixture: ComponentFixture<LeftBarChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftBarChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftBarChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
