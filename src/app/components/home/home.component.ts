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
  constructor(
    private userAPIService: UserAPIService,
    private router: Router,
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService
  ) {}

  subUserLogStatus$!: Subscription;
  subEditor$!: Subscription;

  auth = getAuth();
  statusAuth = authState(this.auth);

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(11)]),
    about: new FormControl('', [Validators.maxLength(32)]),
    details: new FormControl('', [Validators.maxLength(120)]),
  });

  index = 0;

  readonly items = [
    'angular.svg',
    'avatar.jpg',
    'angular.svg',
    'avatar.jpg',
    'angular.svg',
    'avatar.jpg',
  ];

  ngOnInit(): void {
    this.subUserLogStatus$ = this.statusAuth.subscribe((user) => {
      if (!user) {
        this.router.navigate(['login']);
      }
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
    });
  }

  ngOnDestroy(): void {
    this.subUserLogStatus$.unsubscribe();
    this.subEditor$.unsubscribe();
  }

  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.form.controls.name.setValue(this.user.name);
    this.form.controls.about.setValue(this.user.about);
    this.form.controls.details.setValue(this.user.details);

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
      this.form.controls.details.value!
    );
    this.ngOnInit();
  }
}
