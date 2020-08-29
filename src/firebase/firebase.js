import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyA9KSNosvGGM3on16_AujpiNIn-DE_lHrg",
    authDomain: "the-lq-app-development-project.firebaseapp.com",
    databaseURL: "https://the-lq-app-development-project.firebaseio.com",
    projectId: "the-lq-app-development-project",
    storageBucket: "the-lq-app-development-project.appspot.com",
    messagingSenderId: "71682298919",
    appId: "1:71682298919:web:688ab2feb7d4b1b571ea02",
    measurementId: "G-5S9QPL9M99"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const database = firebase.database()
const storage = firebase.storage()

export {
    firebase,
    storage,
    database as default,
}