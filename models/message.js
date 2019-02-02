class Message{

  constructor(data){
    this.messageContent = data.messageContent;
    this.sender = data.sender;
  }

  serialize(){
    return {
      messageContent: this.messageContent,
      sender: this.sender
    }
  }

}
