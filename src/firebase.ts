import app from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

let firebaseConfig = {
  apiKey: "AIzaSyDD3T2PCuQ9N0F1DsHxQ4u6r8s0MPyDBG0",
  authDomain: "reactapp-b2e17.firebaseapp.com",
  databaseURL: "https://reactapp-b2e17.firebaseio.com",
  projectId: "reactapp-b2e17",
  storageBucket: "reactapp-b2e17.appspot.com",
  messagingSenderId: "1077187693560",
  appId: "1:1077187693560:web:e4964f40d06db70458a40d",
  measurementId: "G-CRH9TVV4W8"
};
// Initialize Firebase

class Firebase {
  app: app.database.Database
  constructor() {
    app.initializeApp(firebaseConfig);
    this.app = app.database()
  }
  login(email: string, password: string) {
    return app.auth().signInWithEmailAndPassword(email, password)
  }
  async registrar(email: string, password: string, nome: string) {
    await app.auth().createUserWithEmailAndPassword(email, password)
    const currentUser = app.auth().currentUser;
    if (currentUser) {
      return app.database().ref('usuarios').child(currentUser.uid).set({ nome: nome })
    }
  }
  isInicialized(): any {
    return new Promise(resolve => {
      app.auth().onAuthStateChanged(resolve)
    })
  }
  getCurrentUser() {
    const current = app.auth().currentUser
    console.log(current)
    return current && current.email
  }
}

export default new Firebase()



