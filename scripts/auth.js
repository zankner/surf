class Auth {

  //Create a user with their email and passowrd
  static createUser(email, password, callback){
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
      console.log("hello");
      //Handle errors here
      var errorCode = error.code;
      var errorMessage = error.message;
      callback()
    });
  }

  //Sign in a user with their email and password
  static signIn(email, password){
    console.log("called");
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
      //Handle errors here
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  // Init Firebase Auth
  static initFirebaseAuth(){
    //Listen to auth state changes.
    firebase.auth().onAuthStateChanged(authStateObserver)
  }

  static curSignedIn(){
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user, 'hello')
    } else {
      console.log("hello")
      // No user is signed in.
    }
    });
  }


}
