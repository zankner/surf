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

  //Accept a friend request
  static acceptRequest(pendingUser, acceptingUser){
    const pendingRef = firebase.database().ref('users/' + pendingUser.id + '/friends/' + acceptingUser.id);
    const acceptingRef = firebase.database().ref('users/' + acceptingUser.id + '/friends/' + pendingUser.id);
    pendingRef.set({
      status: 'accepted'
    });
    acceptingRef.set({
      status: 'accepted'
    });
  }

}
