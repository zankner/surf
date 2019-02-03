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

		currentUser = new User(uid, displayName, email)
	}
});

// Listen for message submission
$('#sendMessage').submit((e) => {
	e.preventDefault();

	const date = new Date();
	const message = new Message(currentUser.uid, currentUser.displayName, $('#sendMessage [name="message"]').val(), date.getTime());

	chrome.tabs.getSelected((tab) => {
		DatabaseService.addMessage(message, new URL(tab.url))
	});

	$('#sendMessage input').val('');
});

// Listen for messages
chrome.tabs.getSelected((tab) => {
	DatabaseService.getMessageStream(new URL(tab.url), (snapshot) => {
		const message = snapshot.val();
		HTMLService.addMessage(message.displayName, message.content)
	})
});

// Log out
$('#logoutLink').click(() => {
	firebase.auth().signOut().then(function() {
		window.location.href = 'login.html';
		chrome.browserAction.setPopup({
			popup: 'login.html'
		})
	})
});

$('#homeLink').click(() => {
	HTMLService.showChat()
});

$('#forumsLink').click(() => {
	HTMLService.showTopics()
});