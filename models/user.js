class User {
	constructor(uid, displayName, email, photoURL) {
		this.uid = uid;
		this.displayName = displayName;
		this.email = email;
		this.photoURL = photoURL;
	}

	serialize() {
		return {
			uid: this.uid,
			displayName: this.displayName,
			email: this.email,
			photoURL: this.photoURL
		};
	}
}
