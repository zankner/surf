class Chat{

  constructor(data){
    this.creator = data.creator;
    this.name = data.name;
    this.invitedUsers = data.invitedUsers;
  }

  serialize(){
    return {
      creator: this.creator,
      name: this.name,
      invitedUsers: this.invitedUsers
    };
  }

}
