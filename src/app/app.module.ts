import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
  TuiThemeNightModule,
  TuiButtonModule,
  TuiErrorModule,
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
import { TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    WidgetComponent,
    LinkComponent,
    HeaderComponent,
    StartPageComponent,
    SignUpComponent,
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
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    AngularFireModule.initializeApp(environment.firebase),

    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
