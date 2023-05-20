import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.less'],
})
export class AppBarComponent implements OnInit {
  @Input()
  router!: string;

  ngOnInit(): void {
    console.log(this.router);
  }

  goHome() {}

  goQr() {}

  goContacts() {}
}
