import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { authState } from '@angular/fire/auth';
import { Firestore, collection } from '@angular/fire/firestore';
import {
  createUserWithEmailAndPassword,
  getAuth,
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

  async login(email: string, password: string) {
    await this.auth.signOut();
    const queryEmail = await query(
      collection(this.db, 'user'),
      where('email', '==', email)
    );
    const emailSnapshot = await getDocs(queryEmail);
    if (emailSnapshot.docs.length === 0) {
      return { code: 41, message: 'Этот email не найден' };
    }
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return { code: 21, message: 'Вход выполнен' };
    } catch (err) {
      return { code: 44, message: 'Неверный пароль' };
    }
  }

  async logOut() {
    await this.auth.signOut();
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
        totem: 'assets/totem/totem1.png',
        contacts: [],
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
