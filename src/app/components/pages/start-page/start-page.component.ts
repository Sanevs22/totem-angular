import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.less'],
})
export class StartPageComponent {
  constructor(private router: Router) {}
  goSpec() {
    this.router.navigate(['user']);
  }

  goSignUp() {
    this.router.navigate(['sign']);
  }

  goLogin() {
    this.router.navigate(['login']);
  }
}
