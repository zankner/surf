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
}
