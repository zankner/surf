class Message {
	constructor(sender, content, timestamp) {
		this.id = sender + timestamp.toString();
		this.timestamp = timestamp;
		this.sender = sender;
		this.content = content;
	}

	serialize() {
		return {
			id: this.id,
			timestamp: this.timestamp,
			sender: this.sender,
			content: this.content
		};
	}
}
