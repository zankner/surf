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

		ref.on('child_added', callback);
	}

	// Add a user to the database
	static addUser(user) {
		const ref = firebase.database().ref('users/' + user.uid);
		ref.set(user.serialize());
	}

	// Send friend request
	static friendRequest(sendingUserId, receivingUserId) {
		const sendingRef = firebase.database().ref('users/' + sendingUserId + '/friends/' + receivingUserId);
		const reveingRef = firebase.database().ref('users/' + receivingUserId + '/friends/' + sendingUserId);
		sendingRef.set({
			status: 'requested'
		});
		reveingRef.set({
			status: 'pending'
		});
	}

	// Accept a friend request
	static acceptRequest(pendingUserId, acceptingUserId) {
		const pendingRef = firebase.database().ref('users/' + pendingUserId + '/friends/' + acceptingUserId);
		const acceptingRef = firebase.database().ref('users/' + acceptingUserId + '/friends/' + pendingUserId);
		pendingRef.set({
			status: 'accepted'
		});
		acceptingRef.set({
			status: 'accepted'
		});
	}

	// Generate a report
	static addReport(report) {
		const reportRef = firebase.database().ref('reports/' + report.id);
		reportRef.set(report.serialize());
	}

	// Get all of the reports
	static getReports(callback) {
		const ref = firebase.database().ref('reports');
		ref.on('value', function (snapshot) {
			callback(snapshot.val());
		});
	}

	// Form a forum topic
	static addTopic(forumTopic) {
		const ref = firebase.database().ref('domains/' + forumTopic.domainId + '/pages/' + forumTopic.pageId + '/forums/' + forumTopic.id + '/topic');
		ref.set(forumTopic.serialize());
	}

	// Add a comment to a forum topic
	static addComment(forumComment) {
		const ref = firebase.database().ref('domains/' + forumComment.domainId + '/pages/' + forumComment.pageId + '/forums/' + forumComment.forumId + '/comments/' + forumComment.id);
		ref.set(forumComment.serialize());
	}

	// Get all the forum topics
	static getTopics(domainId, pageId, callback){
		const ref = firebase.database().ref('domains/' + domainId + '/pages/' + pageId + '/forums')
		ref.once('value').then(function(snapshot){
			let topics = [];
			snapshot.forEach(function (childSnapshot){
				topics.push(childSnapshot.val().topic)
			});
			callback(topics)
		});
	}

	// Vote on a forum comment
	static vote(vote, pageId, domainId, forumId, commentId) {
		const ref = firebase.database().ref('domains/' + domainId + '/pages/' + pageId + '/forums/' + forumId + '/comments/' + commentId);
		ref.once('value').then(function (snapshot) {
			if (vote == 'upvote') {
				ref.child('upvotes').set(snapshot.val().upvotes += 1);
			} else {
				ref.child('downvotes').set(snapshot.val().downvotes += 1);
			}
			ref.child('totalVotes').set(snapshot.val().totalVotes += 1);
		});
	}

	// Search for a certain forum thread
	static search(content, pageId, domainId, callback) {
		const ref = firebase.database().ref('domains/' + domainId + '/pages/' + pageId + '/forums');
		ref.once('value').then(function (snapshot) {
			let similar = [];
			for (let element in snapshot.val()) {
				if ((snapshot.val()[element].topic.focus.includes(content)) || (content.includes(snapshot.val()[element].topic.focus))) {
					similar.push(element);
				}
			}
			;
			callback(similar);
		});
	}


}
