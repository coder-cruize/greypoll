import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsycStorage from "@react-native-async-storage/async-storage";
import { getDatabase, ref, onValue, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBVLqzbgVf_XVIyy5M31i8ykaXjxRXTXZs",
  authDomain: "greypoll-1b357.firebaseapp.com",
  databaseURL: "https://greypoll-1b357-default-rtdb.firebaseio.com",
  projectId: "greypoll-1b357",
  storageBucket: "greypoll-1b357.appspot.com",
  messagingSenderId: "902804678405",
  appId: "1:902804678405:web:fca929aed9c245e865b96c",
};

const app = initializeApp(firebaseConfig);
const authentication = initializeAuth(app, {
  persistence: getReactNativePersistence(AsycStorage),
});
const database = getDatabase();

const db = {
  read: function (path) {
    return new Promise((resolve, reject) => {
      onValue(ref(database, path), (snapshot) => {
        resolve(snapshot.val());
      });
    });
  },
  write: function (path, data) {
    set(ref(database, path), data);
  },
};

const auth = {
  auth: authentication,
  authState: onAuthStateChanged,
  email: {
    signup: (name, email, password) => {
      return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(authentication, email, password)
          .then((userCredential) => {
            updateProfile(userCredential.user, { displayName: name })
              .then(() => {
                resolve(userCredential.user);
              })
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    login: (email, password) => {
      return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(authentication, email, password)
          .then((userCredential) => {
            resolve(userCredential.user);
          })
          .catch((error) => {
            reject(error);
          });
      })
    }
  },
  signOut: () => {
    return new Promise((resolve, reject) => {
      signOut(authentication)
        .then(resolve)
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export { auth, db };
