import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { UserAPIService } from './user-api.service';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  storage = getStorage();

  constructor(private userAPIService: UserAPIService) {}

  readonly totem = [
    'assets/totem/totem1.png',
    'assets/totem/totem2.png',
    'assets/totem/totem3.png',
    'assets/totem/totem4.png',
    'assets/totem/totem5.png',
    'assets/totem/totem6.png',
    'assets/totem/totem7.png',
    'assets/totem/totem8.png',
  ];

  readonly icons = [
    'assets/icon/icon1.png',
    'assets/icon/icon2.png',
    'assets/icon/icon3.png',
    'assets/icon/icon4.png',
    'assets/icon/icon5.png',
  ];

  async uploadAvatar(nickname: string, image: File) {
    const avatarRef = ref(this.storage, `avatars/${nickname}.jpg`);
    await uploadBytes(avatarRef, image);
    const url = await getDownloadURL(avatarRef);
    await this.userAPIService.updateAvatarData(nickname, url);
    return { code: 22, message: 'Изображение загружено' };
  }
}
