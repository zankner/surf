class DatabaseService {
	// Add a message to the database
	static addMessage(message, url) {
		const encodedDomain = encodeURIComponent(url.hostname).replace(/\./g, '%2E');
		const encodedPath = encodeURIComponent(url.pathname).replace(/\./g, '%2E');

		let ref;
		if (url.pathname === '/') {
			ref = firebase.database().ref('domains/' + encodedDomain + '/messages/' + message.id);
		} else {
			ref = firebase.database().ref('domains/' + encodedDomain + '/pages/' + encodedPath + '/messages/' + message.id);
		}

		ref.set(message.serialize());
	}

	// Listen to a conversation
	static getMessageStream(url, callback) {
		const encodedDomain = encodeURIComponent(url.hostname).replace(/\./g, '%2E');
		const encodedPath = encodeURIComponent(url.pathname).replace(/\./g, '%2E');

		let ref;
		if (url.pathname === '/') {
			ref = firebase.database().ref('domains/' + encodedDomain + '/messages');
		} else {
			ref = firebase.database().ref('domains/' + encodedDomain + '/pages/' + encodedPath + '/messages');
		}

		ref.on('child_added', callback)
	}

	// Send friend request
	static friendRequest(sendingUserId, receivingUserId){
    const sendingRef = firebase.database().ref('users/' + sendingUserId + '/friends/' + receivingUserId);
    const reveingRef = firebase.database().ref('users/' + receivingUserId + '/friends/' + sendingUserId);
    sendingRef.set({
      status: 'requested'
    });
    reveingRef.set({
      status: 'pending'
    });
  }

	//Accept a friend request
  static acceptRequest(pendingUserId, acceptingUserId){
    const pendingRef = firebase.database().ref('users/' + pendingUserId + '/friends/' + acceptingUserId);
    const acceptingRef = firebase.database().ref('users/' + acceptingUserId + '/friends/' + pendingUserId);
    pendingRef.set({
      status: 'accepted'
    });
    acceptingRef.set({
      status: 'accepted'
    });
  }

	//Generate a report
  static addReport(reportClass, reportId){
		const reportRef = firebase.database().ref('reports/' + reportId);
    reportRef.set(reportClass.serialize());
	}

	//Get all of the reports
  static getReports(callback){
    const ref = firebase.database().ref('reports');
    ref.on('value', function(snapshot) {
      callback(snapshot.val())
    });
  }

	//Form a forum topic
  static addTopic(forumTopic, pageId, domainId, forumId){
    const ref = firebase.database().ref('domains/' + domainId + '/pages/' + pageId + '/forums/' + forumId + '/topic');
    ref.set(forumTopic.serialize());
  }

	//Add a comment to a forum topic
  static addComment(forumComment, pageId, domainId, forumId, commentId){
    const ref = firebase.database().ref('domains/' + domainId + '/pages/' + pageId + '/forums/' + forumId + '/comments/' + commentId);
    ref.set(forumComment.serialize());
  }

	//Vote on a forum comment
  static vote(vote, pageId, domainId, forumId, commentId){
    const ref = firebase.database().ref('domains/' + domainId + '/pages/' + pageId + '/forums/' + forumId + '/comments/' + commentId);
    ref.once('value').then(function(snapshot) {
      if(vote=='upvote'){
        ref.child('upvotes').set(snapshot.val().upvotes +=1);
      }else{
        ref.child('downvotes').set(snapshot.val().downvotes +=1);
      }
      ref.child('totalVotes').set(snapshot.val().totalVotes += 1);
    });
  }

	//Search for a certain forum thread
	static search(content, pageId, domainId, callback){
    const ref = firebase.database().ref('domains/' + domainId + '/pages/' + pageId + '/forums');
    ref.once('value').then(function(snapshot){
      let similar = [];
      for(let element in snapshot.val()){
        if((snapshot.val()[element].topic.focus.includes(content)) || (content.includes(snapshot.val()[element].topic.focus))){
          similar.push(element)
        }
      };
      callback(similar)
    });
  }


}
