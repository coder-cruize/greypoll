import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBVLqzbgVf_XVIyy5M31i8ykaXjxRXTXZs",
  authDomain: "greypoll-1b357.firebaseapp.com",
  databaseURL: "https://greypoll-1b357-default-rtdb.firebaseio.com",
  projectId: "greypoll-1b357",
  storageBucket: "greypoll-1b357.appspot.com",
  messagingSenderId: "902804678405",
  appId: "1:902804678405:web:fca929aed9c245e865b96c"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();

export const db = {
  read: function (path) {
    return new Promise((resolve, reject) => {
      onValue(ref(database, path), (snapshot) => {
        resolve(snapshot.val());
      });
    })
  },

  
  write: function (path, data) {
    set(ref(database, path), data);
  },
  test: new Promise((resolve, reject) => {

  })
}
