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
Database.addMessage();