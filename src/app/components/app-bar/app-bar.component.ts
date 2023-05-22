import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.less'],
})
export class AppBarComponent {
  @Input()
  route!: string;
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['']);
  }

  goShare() {
    this.router.navigate(['share']);
  }

  goContacts() {
    this.router.navigate(['contacts']);
  }
}
