import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getFirestore } from '@angular/fire/firestore';
import { getDatabase, set, ref } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  async signUp(email: string, password: string) {
    try {
      let user = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  }
}
