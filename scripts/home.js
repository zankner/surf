// Set up Firebase
firebase.initializeApp({
	apiKey: 'AIzaSyDseMkTLUHAH7TOQChdac8gwn-W2kc0IKk',
	authDomain: 'surf-756c1.firebaseapp.com',
	databaseURL: 'https://surf-756c1.firebaseio.com',
	projectId: 'surf-756c1',
	storageBucket: 'surf-756c1.appspot.com',
	messagingSenderId: '903716384912'
});

// Scroll to bottom of thread
const messageContainer = $('#messageContainer');
messageContainer.scrollTop(messageContainer[0].scrollHeight);

// Set default sender
let me = 'ben';

// Listen for message submission
$('#sendMessage').submit((e) => {
	e.preventDefault();

	const date = new Date();
	const message = new Message(me, $('#sendMessage [name="message"]').val(), date.getTime());

	chrome.tabs.getSelected((tab) => {
		Database.addMessage(message, new URL(tab.url))
	});
});