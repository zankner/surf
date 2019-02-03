class Topic {
	constructor(uid, displayName, title, timestamp) {
		this.id = uid + timestamp.toString();
		this.uid = uid;
		this.displayName = displayName;
		this.title = title;
		this.timestamp = timestamp;
		this.comments = {};
	}

	serialize() {
		return {
			id: this.id,
			uid: this.uid,
			displayName: this.displayName,
			title: this.title,
			timestamp: this.timestamp,
			comments: this.comments
		};
	}
}
