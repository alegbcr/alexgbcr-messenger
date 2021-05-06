import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAyefSu4l5-N2RaFlfML4XjtjV-TkoJBQ4",
  authDomain: "alegbcr-messenger.firebaseapp.com",
  projectId: "alegbcr-messenger",
  storageBucket: "alegbcr-messenger.appspot.com",
  messagingSenderId: "359596223601",
  appId: "1:359596223601:web:fe741c35026a39af53ffd0",
  measurementId: "G-W76V87YWEL",
});

const db = firebaseApp.firestore();

export default db;
