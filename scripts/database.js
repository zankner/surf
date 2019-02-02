class Database {

  //Add a message to the database
  static addMessage(message, universal, id){
    if(universal){
      const ref = firebase.database().ref('domains/' + domainId + '/chats/' + id + '/messages/' + message.id);
    }
    else{
      const ref = firebase.database().ref('domains/' + domainId + '/chats/' + id + '/messages/' + message.id);
    }
    ref.set(message.serialize);
  }

}
