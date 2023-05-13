import { Component, Input } from '@angular/core';
import { Widget } from 'src/app/interfaces/widget';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.less'],
})
export class WidgetComponent {
  @Input()
  widget!: Widget;
}
