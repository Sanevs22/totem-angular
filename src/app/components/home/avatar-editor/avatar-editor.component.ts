import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { HomeComponent } from '../home.component';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-avatar-editor',
  templateUrl: './avatar-editor.component.html',
  styleUrls: ['./avatar-editor.component.less'],
})
export class AvatarEditorComponent implements OnInit {
  @Output()
  avatarLoaded = new EventEmitter<boolean>();

  @ViewChild('input')
  inputRef!: ElementRef;
  imagePreview: string | any = '';
  file!: File;

  loader = false;

  constructor(
    private mediaService: MediaService,
    private homeComponent: HomeComponent
  ) {}
  ngOnInit(): void {
    this.imagePreview = this.homeComponent.user.avatar;
  }

  openInput() {
    this.inputRef.nativeElement.click();
  }
  selectFile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(this.file);
  }

  async saveAvatar() {
    this.loader = true;
    await this.mediaService.uploadAvatar(
      this.homeComponent.user.nickname,
      this.file
    );
    this.loader = false;
    this.avatarLoaded.emit(true);
  }
}
