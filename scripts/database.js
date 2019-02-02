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

  //Send a friend request
  static friendRequest(sendingUser, receivingUser){
    const sendingRef = firebase.database().ref('users/' + sendingUser.id + '/friends/' + receivingUser.id);
    const reveingRef = firebase.database().ref('users/' + receivingUser.id + '/friends/' + sendingUser.id);
    sendingRef.set({
      status: 'requested'
    });
    reveingRef.set({
      status: 'pending'
    });
  }

}
