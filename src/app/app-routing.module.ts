import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { StartPageComponent } from './components/pages/start-page/start-page.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { ErrComponent } from './components/pages/err/err.component';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'sign', component: SignUpComponent },
  { path: 'user', component: UserComponent },
  { path: 'err', component: ErrComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
