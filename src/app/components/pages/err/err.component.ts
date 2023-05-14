import { Component } from '@angular/core';
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

@Component({
  selector: 'app-err',
  template: `
    ghbdtn
    <button (click)="log()">login</button>
    <button (click)="upd()">update</button>
    <button (click)="out()">out</button>
    <button (click)="status()">status</button>
  `,
})
export class ErrComponent {
  constructor(private firestore: Firestore) {
    // const db = getFirestore();
    // async function new22() {
    //   docRef = await addDoc(collection(db, 'user'), {
    //     first: 'Ada23432',
    //     last: 'Lovel3223ace',
    //     born: 1815,
    //     lex: {
    //       tes: '22',
    //     },
    //   });
    //   console.log('Document written with ID: ', docRef.id);
    // }
    // new22();
  }
  db = getFirestore();
  auth = getAuth();

  log() {
    signInWithEmailAndPassword(this.auth, 'test7@ds.com', 'pass222323').then(
      (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
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
    // signOut(this.auth)
    //   .then((i) => {
    //     console.log(i);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  status() {
    this.auth.onAuthStateChanged((user) => {
      console.log(user);
    });
  }
}

// const querySnapshot = await getDocs(collection(db, 'user'));
// querySnapshot.forEach((doc) => {
//   console.log(doc.data());
// });
