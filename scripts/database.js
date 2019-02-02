class Database {

  //Add a message to the database
  static addMessage(message, universal, id, domainId){
    console.log(universal)
    if(universal){
      console.log('hello')
      var ref = firebase.database().ref('domains/' + domainId + '/chats/' + id + '/messages/' + message.id);
    }
    else{
      console.log('hello')
      var ref = firebase.database().ref('domains/' + domainId + '/chats/' + id + '/messages/' + message.id);
    }
    ref.set(message.serialize);
  }

  //Send a friend request
  static friendRequest(sendingUserId, receivingUserId){
    var sendingRef = firebase.database().ref('users/' + sendingUserId + '/friends/' + receivingUserId);
    var reveingRef = firebase.database().ref('users/' + receivingUserId + '/friends/' + sendingUserId);
    sendingRef.set({
      status: 'requested'
    });
    reveingRef.set({
      status: 'pending'
    });
  }

  //Accept a friend request
  static acceptRequest(pendingUserId, acceptingUserId){
    var pendingRef = firebase.database().ref('users/' + pendingUserId + '/friends/' + acceptingUserId);
    var acceptingRef = firebase.database().ref('users/' + acceptingUserId + '/friends/' + pendingUserId);
    pendingRef.set({
      status: 'accepted'
    });
    acceptingRef.set({
      status: 'accepted'
    });
  }

}
