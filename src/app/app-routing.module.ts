import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { StartPageComponent } from './components/pages/start-page/start-page.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { ErrComponent } from './components/pages/err/err.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ShareComponent } from './components/share/share.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'start', component: StartPageComponent },
  { path: 'share', component: ShareComponent },
  { path: 'sign', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'err', component: ErrComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
