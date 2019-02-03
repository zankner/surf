class Users {

  constructor(uid, displayName, email, photoURL){
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
    this.photoURL = encodeURIComponent(photoUrl);
  }

  serialize(){
    return{
      displayName: this.displayName,
      email: this.email,
      photoURL: this.photoURL,
      uid: this.uid
    };
  }

}
