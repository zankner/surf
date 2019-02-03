// Set up Firebase
firebase.initializeApp({
	apiKey: 'AIzaSyDseMkTLUHAH7TOQChdac8gwn-W2kc0IKk',
	authDomain: 'surf-756c1.firebaseapp.com',
	databaseURL: 'https://surf-756c1.firebaseio.com',
	projectId: 'surf-756c1',
	storageBucket: 'surf-756c1.appspot.com',
	messagingSenderId: '903716384912'
});

// Set name on page load
let name;
chrome.storage.sync.get((results) => {
	if (results['name']) {
		name = results['name'];
	}
});

// Listen for message submission
$('#sendMessage').submit((e) => {
	e.preventDefault();

	if (!name) {
		alert('You must set a name before you can send a message.');
		return
	}

	const date = new Date();
	const message = new Message(name, $('#sendMessage [name="message"]').val(), date.getTime());

	chrome.tabs.getSelected((tab) => {
		DatabaseService.addMessage(message, new URL(tab.url))
	});

	$('#sendMessage input').val('');
});

// Listen for messages
chrome.tabs.getSelected((tab) => {
	DatabaseService.getMessageStream(new URL(tab.url), (snapshot) => {
		const message = snapshot.val();
		HTMLService.addMessage(message.sender, message.content)
	})
});

// Log out
$('#logout').click(() => {
	firebase.auth().signOut().then(function() {
		window.location.href = 'login.html';
		chrome.browserAction.setPopup({
			popup: 'login.html'
		})
	})
});