import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBqRVixZEs0r5-p-gj5nyF2LG_Tjrs02c0",
    authDomain: "realtime-chat-app-996d4.firebaseapp.com",
    projectId: "realtime-chat-app-996d4",
    storageBucket: "realtime-chat-app-996d4.appspot.com",
    messagingSenderId: "182931331683",
    appId: "1:182931331683:web:16d5c8a5b17c3269783656",
    measurementId: "G-754PLXXWB9"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;