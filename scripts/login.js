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

firebase.auth().signInWithPopup(provider).then(function (result) {
	const user = result.user;

	chrome.storage.sync.set({
		displayName: user.displayName,
		uid: user.uid,
		email: user.email
	});

	window.location.href = 'home.html';
	chrome.browserAction.setPopup({
		popup: 'home.html'
	});
}).catch(() => {
	window.close();
});