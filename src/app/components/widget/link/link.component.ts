import { Component, Input, OnInit } from '@angular/core';
import { Widget } from 'src/app/interfaces/widget';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.less'],
})
export class LinkComponent {
  @Input()
  widget!: Widget;
}
