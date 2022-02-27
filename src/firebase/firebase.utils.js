import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyCZEWbi4-TWPHY6GRKmA_KDp2cZd4YOhbY",
    authDomain: "crwn-clothing-db-bfb23.firebaseapp.com",
    projectId: "crwn-clothing-db-bfb23",
    storageBucket: "crwn-clothing-db-bfb23.appspot.com",
    messagingSenderId: "47062539974",
    appId: "1:47062539974:web:f8865271175bffbf8f81c7",
    measurementId: "G-GP3VEMQGK8"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;