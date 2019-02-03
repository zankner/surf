class ForumTopic {

	constructor(sender, timestamp, focus, content, topicTags, forumTitle, pageId, domainId) {
		this.id = sender + timestamp.toString();
		this.sender = data.sender;
		this.focus = data.focus;
		this.content = data.content;
		this.topicTags = data.topicTags;
		this.forumTitle = data.forumTitle;
		this.pageId = data.pageId;
		this.domainId = data.domainId;
	}

	serialize() {
		return {
			id: this.id,
			sender: this.sender,
			focus: this.focus,
			content: this.content,
			topicTags: this.topicTags,
			forumTitle: this.forumTitle
		};
	}
}
