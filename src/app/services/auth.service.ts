import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { authState } from '@angular/fire/auth';
import { Firestore, collection } from '@angular/fire/firestore';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  addDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  db = getFirestore();
  auth = getAuth();

  constructor(private firestore: Firestore) {}

  async status() {
    console.log(22, this.auth);
  }

  async userStatusSuper() {
    let userStatusData = { isLogin: true, uIg: '', nickname: '' };
    await onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        console.log(user);
        userStatusData.isLogin = true;
        userStatusData.uIg = user.uid;
        const queryEmail = await query(
          collection(this.db, 'user'),
          where('email', '==', user.email)
        );
        const emailSnapshot = await getDocs(queryEmail);
        userStatusData.nickname = emailSnapshot.docs[0].data()['nickname'];
        return userStatusData;
      }
      return userStatusData;
    });
  }

  async userStatus() {
    let userStatusData = { isLogin: true, uIg: '', nickname: '' };
    await this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        userStatusData.isLogin = true;
        userStatusData.uIg = user.uid;
        // const queryEmail = query(
        //   collection(this.db, 'user'),
        //   where('email', '==', user.email)
        // );
        // const emailSnapshot = getDocs(queryEmail);
        // emailSnapshot.then((data) => {
        //   userStatusData.nickname = data.docs[0].data()['nickname'];
        // });
      } else {
        userStatusData.isLogin = false;
      }
    });

    console.log(userStatusData);
    return userStatusData;
  }

  async login(email: string, password: string) {
    try {
      let loginUser = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log(loginUser.user.uid);
      return { code: 21, message: 'login' };
    } catch (err) {
      return { code: 44, message: err };
    }
  }

  async signUp(email: string, password: string, nickname: string) {
    const queryEmail = await query(
      collection(this.db, 'user'),
      where('email', '==', email)
    );
    const emailSnapshot = await getDocs(queryEmail);
    if (emailSnapshot.docs.length !== 0) {
      return { code: 41, message: 'Этот email занят' };
    }

    const queryNickname = await query(
      collection(this.db, 'user'),
      where('nickname', '==', nickname)
    );
    const nicknameSnapshot = await getDocs(queryNickname);
    if (nicknameSnapshot.docs.length !== 0) {
      return { code: 42, message: 'Этот nickname занят' };
    }

    try {
      let user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      await addDoc(collection(this.db, 'user'), {
        id: user.user?.uid,
        email: email,
        nickname: nickname,
        name: 'Ваше имя',
        about: 'Расскажите о себе коротко',
        details: 'А тут можно подробнее',
        avatar: 'assets/img/avatar.png',
        totem: 'assets/img/totem.png',
      });
      return {
        code: 21,
        message: 'регистрация прошла успешно',
        nickname: nickname,
      };
    } catch (err) {
      return { code: 44, message: err };
    }
  }
}
