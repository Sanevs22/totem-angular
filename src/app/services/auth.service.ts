import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection } from '@angular/fire/firestore';
import {
  addDoc,
  getDocs,
  getDoc,
  getFirestore,
  doc,
  query,
  where,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private firestore: Firestore) {}

  async signUp(email: string, password: string, nickname: string) {
    const db = getFirestore();
    const queryEmail = query(
      collection(db, 'user'),
      where('email', '==', email)
    );
    const emailSnapshot = await getDocs(queryEmail);
    emailSnapshot.docs.forEach((i) => console.log(i));
    if (emailSnapshot.docs.length === 0) {
      try {
        let user = await this.auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await addDoc(collection(db, 'user'), {
          id: user.user?.uid,
          email: email,
          nickname: nickname,
        });
        console.log(user.user);
        return { code: 3, message: 'регистрация прошла успешно' };
      } catch (err) {
        return { code: 2, message: err };
      }
    } else {
      return { code: 1, message: 'email занят' };
    }
  }
}
