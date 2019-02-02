function setupFirebase() {
	const config = {
		apiKey: 'AIzaSyDseMkTLUHAH7TOQChdac8gwn-W2kc0IKk',
		authDomain: 'surf-756c1.firebaseapp.com',
		databaseURL: 'https://surf-756c1.firebaseio.com',
		projectId: 'surf-756c1',
		storageBucket: 'surf-756c1.appspot.com',
		messagingSenderId: '903716384912'
	};
	firebase.initializeApp(config);
}

setupFirebase();

chrome.browserAction.setPopup({popup: 'home.html'});

$('#signUp').submit((e => {
	e.preventDefault();

	const username = $('#username').val();
	const email = $('#email').val();
	const password = $('#password').val();

	Auth.createUser(email, password, () => {
		chrome.storage.sync.set({
			username: username
		});

		window.location.href = 'home.html';
		chrome.browserAction.setPopup({popup: 'home.html'});
	})
}));