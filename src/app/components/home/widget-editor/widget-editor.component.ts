import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Widget } from 'src/app/interfaces/widget';
import { HomeComponent } from '../home.component';
import { UserAPIService } from 'src/app/services/user-api.service';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-widget-editor',
  templateUrl: './widget-editor.component.html',
  styleUrls: ['./widget-editor.component.less'],
})
export class WidgetEditorComponent {
  @Input()
  widgetType!: string;

  @Output()
  widgetLoaded = new EventEmitter<boolean>();

  index = 0;
  icons = this.mediaService.icons;

  formWidget = new FormGroup({
    header: new FormControl('', [
      Validators.maxLength(32),
      Validators.required,
    ]),
    url: new FormControl('', [Validators.required]),
  });

  constructor(
    private homeComponent: HomeComponent,
    private userAPIService: UserAPIService,
    private mediaService: MediaService
  ) {}

  updateWidgetsHeader() {
    let widget: Widget = {
      type: this.widgetType,
      header: this.formWidget.controls.header.value!,
    };
    if (!this.homeComponent.user.widgets) {
      this.homeComponent.user.widgets = [];
    }
    this.homeComponent.user.widgets.push(widget);
    this.userAPIService
      .updateWidgetsData(
        this.homeComponent.user.nickname,
        this.homeComponent.user.widgets
      )
      .then(() => {
        this.widgetLoaded.emit(true);
      });
  }

  updateWidgetsLink() {
    let widget: Widget = {
      type: this.widgetType,
      header: this.formWidget.controls.header.value!,
      url: `https://${this.formWidget.controls.url.value!}`,
      totem: this.mediaService.icons[this.index],
    };
    if (!this.homeComponent.user.widgets) {
      this.homeComponent.user.widgets = [];
    }
    this.homeComponent.user.widgets.push(widget);
    this.userAPIService
      .updateWidgetsData(
        this.homeComponent.user.nickname,
        this.homeComponent.user.widgets
      )
      .then(() => {
        this.widgetLoaded.emit(true);
      });
  }
}
