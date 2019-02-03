// Set up Firebase
firebase.initializeApp({
	apiKey: 'AIzaSyDseMkTLUHAH7TOQChdac8gwn-W2kc0IKk',
	authDomain: 'surf-756c1.firebaseapp.com',
	databaseURL: 'https://surf-756c1.firebaseio.com',
	projectId: 'surf-756c1',
	storageBucket: 'surf-756c1.appspot.com',
	messagingSenderId: '903716384912'
});

const provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(() => {
	firebase.auth().signInWithPopup(provider).then(function(result) {
		const token = result.credential.accessToken;
		const user = result.user;

		chrome.storage.sync.set({
			displayName: user.displayName,
			uid: user.uid,
			email: user.email
		});

		chrome.browserAction.setPopup({
			popup: 'home.html'
		});

		window.location.href = 'home.html';
	});
});