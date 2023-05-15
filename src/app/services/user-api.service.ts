import { Injectable } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { getDocs, getFirestore, query, where } from 'firebase/firestore';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserAPIService {
  constructor(private firestore: Firestore) {}
  db = getFirestore();
  user!: User;

  async getUser(nickname: string) {
    const queryNickname = await query(
      collection(this.db, 'user'),
      where('nickname', '==', nickname)
    );
    let nicknameSnapshot = await getDocs(queryNickname);
    let userData = nicknameSnapshot.docs[0].data();
    this.user = {
      nickname: userData['nickname'],
      name: userData['name'],
      about: userData['about'],
      avatar: userData['avatar'],
      totem: userData['totem'],
      details: userData['details'],
      widgets: userData['widgets'],
    };
    console.log(this.user);
    return this.user;
  }
}

// user = {
//   nickname: 'mike',
//   name: 'Mike Fox',
//   about: 'Power engineer in a cool company',
//   avatar: 'assets/img/avatar.png',
//   totem: 'assets/img/totem.png',
//   details:
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. UtLorem ipsum dolor sit amet consectetur adipisicing elit. UtLorem ipsum dolor sit amet consectetur adipisicing elit. Ut',
//   widgets: [
//     {
//       type: 'header',
//       header: 'Мои соц.сети',
//     },
//     {
//       type: 'link',
//       header: 'Моя соц сеть',
//       totem: 'assets/img/totem.png',
//       url: 'https://www.google.com/',
//     },
//     {
//       type: 'link',
//       header: 'Моя соц сеть',
//       totem: 'assets/img/totem.png',
//       url: 'https://www.google.com/',
//     },
//     {
//       type: 'link',
//       header: 'Моя соц сеть',
//       totem: 'assets/img/totem.png',
//       url: 'https://www.google.com/',
//     },
//     {
//       type: 'header',
//       header: 'Моя музыка для души и тела и все остального',
//     },
//     {
//       type: 'link',
//       header: 'Моя соц сеть',
//       totem: 'assets/img/totem.png',
//       url: 'https://www.google.com/',
//     },
//     {
//       type: 'link',
//       header: 'Моя соц сеть',
//       totem: 'assets/img/totem.png',
//       url: 'https://www.google.com/',
//     },
// {
//   type: 'link',
//   header: 'Моя соц сеть',
//   totem: 'assets/img/totem.png',
//   url: 'https://www.google.com/',
// },
//   ],
// };
