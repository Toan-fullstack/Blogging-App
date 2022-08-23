import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; //getFirestore
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2JEcIfiXrhFbtTWlHLk2obzQwrvA-xZo",
  authDomain: "monkey-blogging-8ea21.firebaseapp.com",
  projectId: "monkey-blogging-8ea21",
  storageBucket: "monkey-blogging-8ea21.appspot.com",
  messagingSenderId: "876010046035",
  appId: "1:876010046035:web:bec1bb55dd9cf126b53ca6",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); //use database
export const auth = getAuth(app); //register,login...auth
// set rules in firebase ,allow user can access database when request.auth != null
