import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
  TuiThemeNightModule,
  TuiButtonModule,
  TuiErrorModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { WidgetComponent } from './components/widget/widget.component';
import { LinkComponent } from './components/widget/link/link.component';
import { HeaderComponent } from './components/widget/header/header.component';
import { StartPageComponent } from './components/pages/start-page/start-page.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiCarouselModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiPaginationModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ErrComponent } from './components/pages/err/err.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/home/home.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    WidgetComponent,
    LinkComponent,
    HeaderComponent,
    StartPageComponent,
    SignUpComponent,
    ErrComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiThemeNightModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiAlertModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextAreaModule,
    TuiErrorModule,
    TuiCarouselModule,
    TuiPaginationModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
    TuiFieldErrorPipeModule,
    LottieModule.forRoot({ player: playerFactory }),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
