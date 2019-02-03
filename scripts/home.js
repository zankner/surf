// Set up Firebase
firebase.initializeApp({
	apiKey: 'AIzaSyDseMkTLUHAH7TOQChdac8gwn-W2kc0IKk',
	authDomain: 'surf-756c1.firebaseapp.com',
	databaseURL: 'https://surf-756c1.firebaseio.com',
	projectId: 'surf-756c1',
	storageBucket: 'surf-756c1.appspot.com',
	messagingSenderId: '903716384912'
});

// Set nickname on page load
let nickname;
chrome.storage.sync.get((results) => {
	if (results['nickname']) {
		nickname = results['nickname'];
		$('#setNickname [name="nickname"]').attr('placeholder', `Nickname: ${nickname}`)
	}
});

// Listen for message submission
$('#sendMessage').submit((e) => {
	e.preventDefault();

	if (!nickname) {
		alert('You must set a nickname before you can send a message.');
		return
	}

	const date = new Date();
	const message = new Message(nickname, $('#sendMessage [name="message"]').val(), date.getTime());

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

// Set nickname
$('#setNickname').submit((e) => {
	e.preventDefault();

	const nicknameInput = $('#setNickname [name="nickname"]');
	nickname = nicknameInput.val();
	nicknameInput.attr('placeholder', `Nickname: ${nickname}`);
	nicknameInput.val('');

	chrome.storage.sync.set({nickname: nickname})
});