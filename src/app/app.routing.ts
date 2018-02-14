import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import {LoginPageComponent} from './login-page/login-page.component';
import {ChatWrapperComponent} from './app-wrapper/chats/chat-wrapper/chat-wrapper.component';
import {VacansComponent} from './app-wrapper/vacans/vacans.component';
import {ProfileComponent} from './app-wrapper/profile/profile.component';

export const AppRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'chat', component: ChatWrapperComponent },
  { path: 'vacans', component: VacansComponent },
  { path: 'profile', component: ProfileComponent },

];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
