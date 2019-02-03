class DatabaseService {
	// Add a message to the database
	static addMessage(message, url) {
		const encodedDomain = encodeURIComponent(url.hostname).replace(/\./g, '%2E');
		const encodedPath = encodeURIComponent(url.pathname).replace(/\./g, '%2E');
		const ref = firebase.database().ref('domains/' + encodedDomain + '/pages/' + encodedPath + '/messages/' + message.id);

		ref.set(message.serialize());
	}

	// Create a topic
	static addTopic(topic, url) {
		const encodedDomain = encodeURIComponent(url.hostname).replace(/\./g, '%2E');
		const encodedPath = encodeURIComponent(url.pathname).replace(/\./g, '%2E');
		const ref = firebase.database().ref('domains/' + encodedDomain + '/pages/' + encodedPath + '/topics/' + topic.id);

		ref.set(topic.serialize());
	}

	// Listen to a conversation
	static getMessageStream(url, callback) {
		const encodedDomain = encodeURIComponent(url.hostname).replace(/\./g, '%2E');
		const encodedPath = encodeURIComponent(url.pathname).replace(/\./g, '%2E');
		const ref = firebase.database().ref('domains/' + encodedDomain + '/pages/' + encodedPath + '/messages');

		ref.on('child_added', callback);
	}

	// Get all the topics
	static getTopicStream(url, callback) {
		const encodedDomain = encodeURIComponent(url.hostname).replace(/\./g, '%2E');
		const encodedPath = encodeURIComponent(url.pathname).replace(/\./g, '%2E');
		const ref = firebase.database().ref('domains/' + encodedDomain + '/pages/' + encodedPath + '/topics');

		ref.on('child_added', callback);
	}

	// Get specific topic
	static getTopic(url, id, callback) {
		const encodedDomain = encodeURIComponent(url.hostname).replace(/\./g, '%2E');
		const encodedPath = encodeURIComponent(url.pathname).replace(/\./g, '%2E');
		const ref = firebase.database().ref('domains/' + encodedDomain + '/pages/' + encodedPath + '/topics/' + id);

		ref.once('value', callback);
	}

	// Add a user to the database
	static addUser(user) {
		const ref = firebase.database().ref('users/' + user.uid);
		ref.set(user.serialize());
	}

	// Add a comment to a forum topic
	static addComment(forumComment) {
		const ref = firebase.database().ref('domains/' + forumComment.domainId + '/pages/' + forumComment.pageId + '/forums/' + forumComment.forumId + '/comments/' + forumComment.id);
		ref.set(forumComment.serialize());
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
			callback(similar);
		});
	}
}
