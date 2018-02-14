import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightBarChatComponent } from './right-bar-chat.component';

describe('RightBarChatComponent', () => {
  let component: RightBarChatComponent;
  let fixture: ComponentFixture<RightBarChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightBarChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightBarChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
