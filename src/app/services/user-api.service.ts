import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAPIService {
  constructor() {}
  user = {
    name: 'Mike Fox',
    about: 'Power engineer in a cool company',
    avatar: 'assets/img/avatar.png',
    totem: 'assets/img/totem.png',
    details:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. UtLorem ipsum dolor sit amet consectetur adipisicing elit. UtLorem ipsum dolor sit amet consectetur adipisicing elit. Ut',
    widgets: [
      {
        type: 'header',
        header: 'Мои соц.сети',
      },
      {
        type: 'link',
        header: 'Моя соц сеть',
        totem: 'assets/img/totem.png',
        url: 'https://www.google.com/',
      },
      {
        type: 'link',
        header: 'Моя соц сеть',
        totem: 'assets/img/totem.png',
        url: 'https://www.google.com/',
      },
      {
        type: 'link',
        header: 'Моя соц сеть',
        totem: 'assets/img/totem.png',
        url: 'https://www.google.com/',
      },
      {
        type: 'header',
        header: 'Моя музыка для души и тела и все остального',
      },
      {
        type: 'link',
        header: 'Моя соц сеть',
        totem: 'assets/img/totem.png',
        url: 'https://www.google.com/',
      },
      {
        type: 'link',
        header: 'Моя соц сеть',
        totem: 'assets/img/totem.png',
        url: 'https://www.google.com/',
      },
      {
        type: 'link',
        header: 'Моя соц сеть',
        totem: 'assets/img/totem.png',
        url: 'https://www.google.com/',
      },
    ],
  };
}
