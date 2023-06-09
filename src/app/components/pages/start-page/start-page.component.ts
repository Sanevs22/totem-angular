import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.less'],
})
export class StartPageComponent {
  constructor(private router: Router) {}

  options: AnimationOptions = {
    path: 'assets/lottie/pages/start-page.json',
    loop: true,
    autoplay: true,
  };

  goSignUp() {
    this.router.navigate(['sign']);
  }

  goLogin() {
    this.router.navigate(['login']);
  }
}
