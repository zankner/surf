class ForumComment{

  constructor(sender, content, timestamp, pageId, domainId, forumId){
    this.id = sender + timestamp.toString();
    this.sender = data.sender;
    this.content = data.content;
    this.pageId = data.pageId;
    this.domainId = data.domainId;
    this.forumId = data.forumId;
    this.totalVotes = 0;
    this.upvotes = 0;
    this.downvotes = 0;
  }

  serialize(){
    return {
      id: this.id,
      sender: this.sender,
      content: this.content,
      totalVotes: this.totalVotes,
      upvotes: this.upvotes,
      downvotes: this.downvotes
    }
  }
}
