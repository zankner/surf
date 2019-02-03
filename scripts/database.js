class Database {

  //Add a message to the database
  static addMessage(message, universal, chatId, domainId){
    console.log(universal)
    if(universal){
      console.log('hello')
      var ref = firebase.database().ref('domains/' + domainId + '/chats/' + chatId + '/messages/' + message.id);
    }
    else{
      console.log('hello')
      var ref = firebase.database().ref('domains/' + domainId + '/chats/' + chatId + '/messages/' + message.id);
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

   //Generate a chat
  static addChat(chatClass, chatId){

    var chat = chatClass.serialize();
    var creatorId = chat.creator;
    var invitedUsers = chat.invitedUsers;
    var chatName = chat.name;

    var creatorRef = firebase.database().ref('users/' + creatorId + '/chats/' + chatId)
    creatorRef.set({
      status: 'creator'
    });

    var chatMembers = {};

    for(var i = 0; i<invitedUsers.length; i+=1){
      chatMembers[invitedUsers[i]]= {status: 'pending'}
      var invitedRef = firebase.database().ref('users/' + invitedUsers[i] + '/chats/' + chatId)
      invitedRef.set({
        status: 'pending'
      });
    }

    var chatRef = firebase.database().ref('chats/' + chatId);

    chatRef.set({
      creator: creatorId,
      numMembers: invitedUsers.length + 1,
      members: chatMembers,
      name: chatName
    })

  }

  //Generate a report
  static addReport(reportClass, reportId){

    var reportRef = firebase.database().ref('reports/' + reportId);

    reportRef.set(reportClass.serialize());

  }

  //Get all of the reports
  static getReports(callback){
    var ref = firebase.database().ref('reports');
    ref.on('value', function(snapshot) {
      callback(snapshot.val())
    })
  }

  //Form a forum topic
  static addTopic(focus, content, topic, pageId, domainId, forumId, forumTitle){
    console.log('yeet')
    const ref = firebase.database().ref('domains/' + domainId + '/chats/' + pageId + '/forum/' + forumId)
    ref.set({
      focus: focus,
      content: content,
      topic: topic,
      forumTitle: forumTitle
    });
  }

 }
