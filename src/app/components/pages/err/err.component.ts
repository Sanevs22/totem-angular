import { Component, OnDestroy, OnInit } from '@angular/core';
import { authState } from '@angular/fire/auth';
import { Firestore, collection } from '@angular/fire/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-err',
  template: `
    ghbdtn
    <button (click)="log()">login</button>
    <button (click)="upd()">update</button>
    <button (click)="out()">out</button>
    <button (click)="status()">status</button>
    <div>{{ (statusAuth | async) ? 'log' : 'out' }}</div>
  `,
})
export class ErrComponent implements OnInit, OnDestroy {
  constructor(private firestore: Firestore) {}
  subscription$!: Subscription;
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription$ = this.statusAuth.subscribe((data) =>
      console.log(22, data)
    );
  }
  db = getFirestore();
  auth = getAuth();
  statusAuth = authState(this.auth);

  log() {
    signInWithEmailAndPassword(this.auth, 'test2@mail.com', '12345678').then(
      (userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
      }
    );
  }

  async upd() {
    const queryEmail = query(
      collection(this.db, 'user'),
      where('email', '==', 'test7@ds.com')
    );
    const emailSnapshot = await getDocs(queryEmail);
    emailSnapshot.docs.forEach((i) => console.log(i));
    let id = emailSnapshot.docs[0].id;
    const washingtonRef = doc(this.db, 'user', id);
    await updateDoc(washingtonRef, {
      nickname: 'los2s',
    });
  }

  async out() {
    await this.auth.signOut();
  }

  async status() {
    let xss;
    await this.auth.onAuthStateChanged((user) => {
      xss = user;
    });
    console.log(xss);
  }
}
