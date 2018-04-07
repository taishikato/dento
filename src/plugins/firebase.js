import firebase from 'firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
        apiKey: "AIzaSyAxZXB9VFwCj3Ot9y9VgcWikn-uIzj2rKM",
        authDomain: "movieing-astronaut.firebaseapp.com",
        databaseURL: "https://movieing-astronaut.firebaseio.com",
        projectId: "movieing-astronaut",
        storageBucket: "movieing-astronaut.appspot.com",
        messagingSenderId: "437029986178"
    }
  )
}
export default firebase;