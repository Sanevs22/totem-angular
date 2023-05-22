import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { getAuth } from 'firebase/auth';
import { authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserAPIService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.less'],
})
export class ShareComponent {
  host = 'https://totem-two.vercel.app/';
  link = this.host;
  nickname!: string;
  loader = true;

  readonly form = new FormGroup({
    link: new FormControl(`${this.host}`),
  });

  subUserLogStatus$!: Subscription;
  auth = getAuth();
  statusAuth = authState(this.auth);

  constructor(private router: Router, private userAPIService: UserAPIService) {}

  ngOnInit(): void {
    this.subUserLogStatus$ = this.statusAuth.subscribe((user) => {
      if (!user) {
        this.router.navigate(['start']);
      } else {
        this.userAPIService.getNickname(user?.uid!).then((nickname) => {
          this.nickname = nickname;
          this.link = `${this.host}user/${nickname}`;
          this.form.controls.link.setValue(this.link);
          this.loader = false;
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subUserLogStatus$) {
      this.subUserLogStatus$.unsubscribe();
    }
  }
}
