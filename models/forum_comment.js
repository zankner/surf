class ForumComment{

  constructor(data){
    this.creator = data.creator;
    this.content = data.content;
    this.totalVotes = 0;
    this.upvotes = 0;
    this.downvotes = 0;
  }

  serialize(){
    return {
      creator: this.creator,
      content: this.content,
      totalVotes: this.totalVotes,
      upvotes: this.upvotes,
      downvotes: this.downvotes
    }
  }
}
