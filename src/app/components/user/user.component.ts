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
    contacts: [],
  };
  loader = true;
  constructor(
    private userAPIService: UserAPIService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let nickname = this.activatedRoute.snapshot.paramMap.get('id');
    if (nickname) {
      this.userAPIService.getUser(nickname).then((user) => {
        if (user) {
          this.user = user;
          this.loader = false;
        } else {
          // TO DO navigate to err-page
          this.router.navigate(['start']);
        }
      });
    } else {
      // TO DO navigate to err-page user not found
      this.router.navigate(['start']);
    }
  }
}
