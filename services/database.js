class Database {
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

		ref.limitToLast(1).on('child_added', callback)
	}

	// Send a friend request
	static friendRequest(sendingUserId, receivingUserId) {
		const sendingRef = firebase.database().ref('users/' + sendingUserId + '/friends/' + receivingUserId);
		const receivingRef = firebase.database().ref('users/' + receivingUserId + '/friends/' + sendingUserId);
		sendingRef.set({
			status: 'requested'
		});
		receivingRef.set({
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

	// Generate a chat
	static addChat(chatClass, chatId) {
		const chat = chatClass.serialize();
		const creatorId = chat.creator;
		const invitedUsers = chat.invitedUsers;
		const chatName = chat.name;

		const creatorRef = firebase.database().ref('users/' + creatorId + '/chats/' + chatId);
		creatorRef.set({
			status: 'creator'
		});

		let chatMembers = {};

		for (let i = 0; i < invitedUsers.length; i += 1) {
			chatMembers[invitedUsers[i]] = {status: 'pending'};
			var invitedRef = firebase.database().ref('users/' + invitedUsers[i] + '/chats/' + chatId);
			invitedRef.set({
				status: 'pending'
			});
		}

		const chatRef = firebase.database().ref('chats/' + chatId);

		chatRef.set({
			creator: creatorId,
			numMembers: invitedUsers.length + 1,
			members: chatMembers,
			name: chatName
		});
	}

	// Generate a report
	static addReport(reportClass, reportId) {
		const reportRef = firebase.database().ref('reports/' + reportId);
		reportRef.set(reportClass.serialize());

	}

	// Get all of the reports
	static getReports(callback) {
		const ref = firebase.database().ref('reports');
		ref.on('value', function (snapshot) {
			callback(snapshot.val());
		});
	}

}
