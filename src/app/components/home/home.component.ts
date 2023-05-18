import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { getAuth } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserAPIService } from 'src/app/services/user-api.service';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Widget } from 'src/app/interfaces/widget';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit, OnDestroy {
  user: User = {
    nickname: '',
    name: '',
    about: '',
    avatar: '',
    totem: '',
    details: '',
    widgets: [],
  };
  loader = true;

  subUserLogStatus$!: Subscription;
  subEditor$!: Subscription;
  subEditorWidget$!: Subscription;
  subEditorAvatar$!: Subscription;

  auth = getAuth();
  statusAuth = authState(this.auth);

  index = 0;
  totems = this.mediaService.totem;

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(11)]),
    about: new FormControl('', [Validators.maxLength(32)]),
    details: new FormControl('', [Validators.maxLength(120)]),
  });

  formWidget = new FormGroup({
    header: new FormControl('', [Validators.maxLength(32)]),
  });

  constructor(
    private userAPIService: UserAPIService,
    private mediaService: MediaService,
    private router: Router,
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService
  ) {}

  ngOnInit(): void {
    this.subUserLogStatus$ = this.statusAuth.subscribe((user) => {
      if (!user) {
        this.router.navigate(['start']);
      } else {
        this.userAPIService.getNickname(user?.uid!).then((nickname) => {
          this.userAPIService.getUser(nickname).then((user) => {
            if (user) {
              this.user = user;
              this.form.controls.name.setValue(this.user.name);
              this.form.controls.about.setValue(this.user.about);
              this.form.controls.details.setValue(this.user.details);
              this.loader = false;
            }
          });
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subUserLogStatus$) {
      this.subUserLogStatus$.unsubscribe();
    }
    if (this.subEditor$) {
      this.subEditor$.unsubscribe();
    }
    if (this.subEditorWidget$) {
      this.subEditorWidget$.unsubscribe();
    }
    if (this.subEditorAvatar$) {
      this.subEditorAvatar$.unsubscribe();
    }
  }

  showDialogUserProfile(content: PolymorpheusContent<TuiDialogContext>): void {
    this.form.controls.name.setValue(this.user.name);
    this.form.controls.about.setValue(this.user.about);
    this.form.controls.details.setValue(this.user.details);
    this.index = this.mediaService.totem.indexOf(this.user.totem);

    this.subEditor$ = this.dialogs
      .open(content, {
        size: 's',
      })
      .subscribe(() => {});
  }

  updateUserData() {
    this.userAPIService.updateUserData(
      this.user.nickname,
      this.form.controls.name.value!,
      this.form.controls.about.value!,
      this.form.controls.details.value!,
      this.mediaService.totem[this.index]
    );
    this.ngOnInit();
  }

  showDialogAddWidget(content: PolymorpheusContent<TuiDialogContext>): void {
    this.subEditorWidget$ = this.dialogs
      .open(content, {
        size: 's',
      })
      .subscribe(() => {});
  }

  updateWidgetsData() {
    let widget: Widget = {
      type: 'header',
      header: this.formWidget.controls.header.value!,
    };
    if (!this.user.widgets) {
      this.user.widgets = [];
    }
    this.user.widgets.push(widget);
    this.userAPIService.updateWidgetsData(
      this.user.nickname,
      this.user.widgets
    );
  }

  showDialogChangeAvatar(content: PolymorpheusContent<TuiDialogContext>): void {
    this.subEditorAvatar$ = this.dialogs
      .open(content, {
        size: 's',
      })
      .subscribe(() => {});
  }
}
