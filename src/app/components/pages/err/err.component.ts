import { Component } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { addDoc, getFirestore } from 'firebase/firestore';

let docRef: any;

@Component({
  selector: 'app-err',
  template: ` ghbdtn `,
})
export class ErrComponent {
  constructor(private firestore: Firestore) {
    const db = getFirestore();
    async function new22() {
      docRef = await addDoc(collection(db, 'user'), {
        first: 'Ada23432',
        last: 'Lovel3223ace',
        born: 1815,
        lex: {
          tes: '22',
        },
      });
      console.log('Document written with ID: ', docRef.id);
    }
    new22();
  }
}

// const querySnapshot = await getDocs(collection(db, 'user'));
// querySnapshot.forEach((doc) => {
//   console.log(doc.data());
// });
