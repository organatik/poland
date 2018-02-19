import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import {LoginPageComponent} from './login-page/login-page.component';
import {ChatWrapperComponent} from './app-wrapper/chats/chat-wrapper/chat-wrapper.component';
import {VacansComponent} from './app-wrapper/vacans/vacans.component';
import {ProfileComponent} from './app-wrapper/profile/profile.component';
import {AuthGuard} from "./shared/service/guard.service";

export const AppRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'chat', component: ChatWrapperComponent, canActivate: [AuthGuard] },
  { path: 'vacans', component: VacansComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: '/chat', pathMatch: 'full' },
  { path: '**', redirectTo: '/chat', pathMatch: 'full' }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
