import { Component, Input } from '@angular/core';
import { Widget } from 'src/app/interfaces/widget';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent {
  @Input()
  widget!: Widget;
}
