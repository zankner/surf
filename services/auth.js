class Auth {
	// Create a user with their email and password
	static createUser(email, password, callback) {
		firebase.auth().createUserWithEmailAndPassword(email, password).then(callback)
	}

	// Sign in a user with their email and password
	static signIn(email, password) {
		firebase.auth().signInWithEmailAndPassword(email, password);
	}

	// Get current user auth object
	static getCurrentUser() {
		return firebase.auth().currentUser
	}
}
