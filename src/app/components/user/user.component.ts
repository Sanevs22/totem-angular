import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserAPIService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
})
export class UserComponent implements OnInit {
  user: User = {
    name: '',
    about: '',
    avatar: '',
    totem: '',
    details: '',
    widgets: [],
  };
  constructor(private userAPIService: UserAPIService) {}

  ngOnInit(): void {
    this.user = this.userAPIService.user;
  }
}
