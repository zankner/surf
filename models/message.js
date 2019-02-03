class Message {
	constructor(uid, displayName, content, timestamp) {
		this.id = timestamp.toString() + uid;
		this.uid = uid;
		this.displayName = displayName;
		this.content = content;
		this.timestamp = timestamp;
	}

	serialize() {
		return {
			id: this.id,
			uid: this.uid,
			displayName: this.displayName,
			content: this.content,
			timestamp: this.timestamp
		};
	}
}
