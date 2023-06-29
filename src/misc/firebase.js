import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyBjzPETF5e25Asv-L1OnZZqpWrkDETvSrE",
  authDomain: "chat-app-c912a.firebaseapp.com",
  databaseURL: "https://chat-app-c912a-default-rtdb.firebaseio.com",
  projectId: "chat-app-c912a",
  storageBucket: "chat-app-c912a.appspot.com",
  messagingSenderId: "516229399259",
  appId: "1:516229399259:web:003530d26cba33954b02fe"
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database=app.database();