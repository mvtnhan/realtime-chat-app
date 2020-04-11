import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDWKvkWv9oBrmkCC9QUPWBguGuWHTIVd04",
    authDomain: "chatty-dd8e6.firebaseapp.com",
    databaseURL: "https://chatty-dd8e6.firebaseio.com"
  };
  firebase.initializeApp(config);
  export const auth = firebase.auth;
  export const db = firebase.database();