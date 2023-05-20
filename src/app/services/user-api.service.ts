import { Injectable } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import {
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { User } from '../interfaces/user';
import { Widget } from '../interfaces/widget';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root',
})
export class UserAPIService {
  constructor(private firestore: Firestore) {}
  db = getFirestore();
  user!: User;

  async getNickname(uid: string) {
    const queryUid = await query(
      collection(this.db, 'user'),
      where('id', '==', uid)
    );
    let uidSnapshot = await getDocs(queryUid);
    let userData = uidSnapshot.docs[0].data();
    if (userData) {
      return userData['nickname'];
    }
  }

  async getUser(nickname: string) {
    const queryNickname = await query(
      collection(this.db, 'user'),
      where('nickname', '==', nickname)
    );
    let nicknameSnapshot = await getDocs(queryNickname);
    if (nicknameSnapshot.docs.length === 0) {
      return null;
    }
    let userData = nicknameSnapshot.docs[0].data();
    this.user = {
      nickname: userData['nickname'],
      name: userData['name'],
      about: userData['about'],
      avatar: userData['avatar'],
      totem: userData['totem'],
      details: userData['details'],
      widgets: userData['widgets'],
      contacts: userData['contacts'],
    };
    console.log(this.user);
    return this.user;
  }

  async updateUserData(
    nickname: string,
    name: string,
    about: string,
    details: string,
    totem: string
  ) {
    const queryEmail = query(
      collection(this.db, 'user'),
      where('nickname', '==', nickname)
    );
    const emailSnapshot = await getDocs(queryEmail);
    let id = emailSnapshot.docs[0].id;
    const userRef = doc(this.db, 'user', id);
    await updateDoc(userRef, {
      name: name,
      about: about,
      details: details,
      totem: totem,
    });
  }

  async updateWidgetsData(nickname: string, widgets: Widget[]) {
    const queryEmail = query(
      collection(this.db, 'user'),
      where('nickname', '==', nickname)
    );
    const emailSnapshot = await getDocs(queryEmail);
    let id = emailSnapshot.docs[0].id;
    const userRef = doc(this.db, 'user', id);
    await updateDoc(userRef, {
      widgets: widgets,
    });
  }

  async updateContactsData(nickname: string, contacts: Contact[]) {
    const queryEmail = query(
      collection(this.db, 'user'),
      where('nickname', '==', nickname)
    );
    const emailSnapshot = await getDocs(queryEmail);
    let id = emailSnapshot.docs[0].id;
    const userRef = doc(this.db, 'user', id);
    await updateDoc(userRef, {
      contacts: contacts,
    });
  }

  async updateAvatarData(nickname: string, url: string) {
    const queryEmail = query(
      collection(this.db, 'user'),
      where('nickname', '==', nickname)
    );
    const emailSnapshot = await getDocs(queryEmail);
    let id = emailSnapshot.docs[0].id;
    const userRef = doc(this.db, 'user', id);
    await updateDoc(userRef, {
      avatar: url,
    });
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
