class Database {
    static addMessage() {
		firebase.database().ref('message').set('ben');
	}
}
