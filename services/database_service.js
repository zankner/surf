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

	// Add comment
	static addComment(comment, url, topicId) {
		const encodedDomain = encodeURIComponent(url.hostname).replace(/\./g, '%2E');
		const encodedPath = encodeURIComponent(url.pathname).replace(/\./g, '%2E');
		const ref = firebase.database().ref('domains/' + encodedDomain + '/pages/' + encodedPath + '/topics/' + topicId + '/comments/' + comment.id);

		ref.set(comment.serialize());
	}

	// Listen to a conversation
	static getMessageStream(url, callback) {
		const encodedDomain = encodeURIComponent(url.hostname).replace(/\./g, '%2E');
		const encodedPath = encodeURIComponent(url.pathname).replace(/\./g, '%2E');
		const ref = firebase.database().ref('domains/' + encodedDomain + '/pages/' + encodedPath + '/messages').orderByChild('timestamp');

		ref.on('child_added', callback);
	}

	// Get a comment stream
	static getCommentStream(url, topicId, callback) {
		const encodedDomain = encodeURIComponent(url.hostname).replace(/\./g, '%2E');
		const encodedPath = encodeURIComponent(url.pathname).replace(/\./g, '%2E');
		const ref = firebase.database().ref('domains/' + encodedDomain + '/pages/' + encodedPath + '/topics/' + topicId + '/comments').orderByChild('timestamp');

		ref.on('child_added', callback);
	}

	static stopCommentStream(url, topicId) {
		const encodedDomain = encodeURIComponent(url.hostname).replace(/\./g, '%2E');
		const encodedPath = encodeURIComponent(url.pathname).replace(/\./g, '%2E');
		const ref = firebase.database().ref('domains/' + encodedDomain + '/pages/' + encodedPath + '/topics/' + topicId + '/comments');

		ref.off('child_added');
	}

	// Get all the topics
	static getTopicStream(url, callback) {
		const encodedDomain = encodeURIComponent(url.hostname).replace(/\./g, '%2E');
		const encodedPath = encodeURIComponent(url.pathname).replace(/\./g, '%2E');
		const ref = firebase.database().ref('domains/' + encodedDomain + '/pages/' + encodedPath + '/topics').orderByChild('timestamp');

		ref.on('child_added', callback);
	}

	// Get specific topic
	static getTopic(url, topicId, callback) {
		const encodedDomain = encodeURIComponent(url.hostname).replace(/\./g, '%2E');
		const encodedPath = encodeURIComponent(url.pathname).replace(/\./g, '%2E');
		const ref = firebase.database().ref('domains/' + encodedDomain + '/pages/' + encodedPath + '/topics/' + topicId);

		ref.once('value', callback);
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
