class ForumTopic{

  constructor(data){
    this.creator = data.creator;
    this.focus = data.focus;
    this.content = data.content;
    this.topicTags = data.topicTags;
    this.forumTitle = data.forumTitle;
  }

  serialize(){
    return {
      creator: this.creator,
      focus: this.focus,
      content: this.content,
      topicTags: this.topicTags,
      forumTitle: this.forumTitle
    }
  }
}
