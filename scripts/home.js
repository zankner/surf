// Set up Firebase
firebase.initializeApp({
	apiKey: 'AIzaSyDseMkTLUHAH7TOQChdac8gwn-W2kc0IKk',
	authDomain: 'surf-756c1.firebaseapp.com',
	databaseURL: 'https://surf-756c1.firebaseio.com',
	projectId: 'surf-756c1',
	storageBucket: 'surf-756c1.appspot.com',
	messagingSenderId: '903716384912'
});

// Show chat and hide other sections
HTMLService.showChat();

// Set name on page load
let currentUser;
chrome.storage.sync.get((results) => {
	if (results['displayName'] && results['uid'] && results['email']) {
		const displayName = results['displayName'];
		const uid = results['uid'];
		const email = results['email'];

		currentUser = new User(uid, displayName, email);
	}
});

// Listen for message send
$('#sendMessage').submit((e) => {
	e.preventDefault();

	const input = $('#sendMessage [name="message"]');
	const date = new Date();
	const message = new Message(currentUser.uid, currentUser.displayName, input.val(), date.getTime());

	chrome.tabs.getSelected((tab) => {
		DatabaseService.addMessage(message, new URL(tab.url));
	});

	input.val('');
});

// Listen for topic creation
$('#createTopic').submit((e) => {
	e.preventDefault();

	const input = $('#createTopic [name="title"]');
	const date = new Date();
	const topic = new Topic(currentUser.uid, currentUser.displayName, input.val(), date.getTime());

	chrome.tabs.getSelected((tab) => {
		DatabaseService.addTopic(topic, new URL(tab.url));
	});

	input.val('');
});

// Listen for comment write
$('#sendComment').submit((e) => {
	e.preventDefault();

	const input = $('#sendComment [name="comment"]');
	const date = new Date();
	const comment = new Message(currentUser.uid, currentUser.displayName, input.val(), date.getTime());

	chrome.tabs.getSelected((tab) => {
		DatabaseService.addComment(comment, new URL(tab.url), currentTopic.id);
	});

	input.val('');
});

// Set current topic
let currentTopic;

// Listen for new messages and topics
chrome.tabs.getSelected((tab) => {
	const url = new URL(tab.url);

	DatabaseService.getMessageStream(url, (snapshot) => {
		const message = snapshot.val();
		HTMLService.addMessage(message.displayName, message.content);
	});

	DatabaseService.getTopicStream(url, (snapshot) => {
		const topic = snapshot.val();
		HTMLService.addTopic(topic.id, topic.title);
	});
});

// Log out
$('#logoutLink').on('click', () => {
	firebase.auth().signOut().then(function () {
		window.location.href = 'login.html';
		chrome.browserAction.setPopup({
			popup: 'login.html'
		});
	});
});

// Show chat
$('#homeLink').on('click', () => {
	HTMLService.showChat();
});

// Show topics
$('#topicsLink').on('click', () => {
	HTMLService.showTopics();
});

// Show topic
$('#topicsContainer').on('click', '*', (e) => {
	const topicId = e.target.id;
	chrome.tabs.getSelected((tab) => {
		const url = new URL(tab.url);

		if (currentTopic)
			DatabaseService.stopCommentStream(url, currentTopic.id);

		DatabaseService.getTopic(url, topicId, (snapshot) => {
			const topic = snapshot.val();
			currentTopic = topic;
			HTMLService.displayTopic(topic.title);
			DatabaseService.getCommentStream(url, topicId, (snapshot) => {
				const comment = snapshot.val();
				HTMLService.addComment(comment.displayName, comment.content);
			});
		});
	});
});