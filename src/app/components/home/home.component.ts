import { Component, OnDestroy, OnInit } from '@angular/core';
import { authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserAPIService } from 'src/app/services/user-api.service';

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
  constructor(private userAPIService: UserAPIService, private router: Router) {}

  subUserLogStatus$!: Subscription;

  auth = getAuth();
  statusAuth = authState(this.auth);

  ngOnInit(): void {
    this.subUserLogStatus$ = this.statusAuth.subscribe((user) => {
      if (!user) {
        this.router.navigate(['login']);
      }
      this.userAPIService.getNickname(user?.uid!).then((nickname) => {
        this.userAPIService.getUser(nickname).then((user) => {
          if (user) {
            this.user = user;
            this.loader = false;
          }
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.subUserLogStatus$.unsubscribe();
  }
}
