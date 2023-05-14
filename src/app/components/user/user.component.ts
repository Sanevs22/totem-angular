import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserAPIService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
})
export class UserComponent implements OnInit {
  user: User = {
    nickname: '',
    name: '',
    about: '',
    avatar: '',
    totem: '',
    details: '',
    widgets: [],
  };
  constructor(
    private userAPIService: UserAPIService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let text = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(text);
    if (this.userAPIService.user.nickname === text) {
      this.user = this.userAPIService.user;
    } else {
      this.router.navigate(['sign']);
    }
  }
}
