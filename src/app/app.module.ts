import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ROUTING } from './app.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';  // <-- #1 import module
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppWrapperComponent } from './app-wrapper/app-wrapper.component';
import { LeftBarChatComponent } from './app-wrapper/chats/left-bar-chat/left-bar-chat.component';
import {RatingModule} from 'ngx-rating';
import { MiddleChatComponent } from './app-wrapper/chats/middle-chat/middle-chat.component';
import { RightBarChatComponent } from './app-wrapper/chats/right-bar-chat/right-bar-chat.component';
import { ChatWrapperComponent } from './app-wrapper/chats/chat-wrapper/chat-wrapper.component';
import { NavComponent } from './app-wrapper/nav/nav.component';
import { VacansComponent } from './app-wrapper/vacans/vacans.component';
import { VacansLeftComponent } from './app-wrapper/vacans/vacans-left/vacans-left.component';
import { VacansRightComponent } from './app-wrapper/vacans/vacans-right/vacans-right.component';
import { ItemVacansComponent } from './app-wrapper/vacans/vacans-right/item-vacans/item-vacans.component';
import { ProfileComponent } from './app-wrapper/profile/profile.component';
import {SelectedItemService} from './selected-item.service';
import {LoginService} from "./shared/service/login.service";
import {AuthGuard} from "./shared/service/guard.service";
import {HttpClientModule} from "@angular/common/http";
import {ChatService} from "./shared/service/chat.service";
import {ProfileService} from "./shared/service/profile.service";
import {VacansService} from "./shared/service/vacans.service";
import { EmptyChatComponent } from './app-wrapper/chats/empty-chat/empty-chat.component';
import { EmptyVacansComponent } from './app-wrapper/vacans/empty-vacans/empty-vacans.component';
import {TranslatePipe} from "./shared/translate";
import {ClickOutsideDirective} from "./shared/click-outside";


@NgModule({
  declarations: [
    AppComponent,
    ClickOutsideDirective,
    LoginPageComponent,
    AppWrapperComponent,
    LeftBarChatComponent,
    MiddleChatComponent,
    RightBarChatComponent,
    ChatWrapperComponent,
    NavComponent,
    VacansComponent,
    VacansLeftComponent,
    VacansRightComponent,
    ItemVacansComponent,
    ProfileComponent,
    EmptyChatComponent,
    EmptyVacansComponent,
    TranslatePipe
  ],
  exports: [TranslatePipe],
  imports: [
    BrowserModule,
    ROUTING,
    ReactiveFormsModule,
    FormsModule,
    RatingModule,
    HttpClientModule,

  ],
  providers: [SelectedItemService, LoginService, AuthGuard, ChatService, ProfileService, VacansService],
  bootstrap: [AppComponent]
})
export class AppModule { }
