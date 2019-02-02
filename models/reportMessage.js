class ReportMessage{

  constructor(data){
    this.reportContent = data.reportContent;
    this.reportType = data.reportType;
    this.creator = data.creator;
    this.reported = data.reported;
  }

  serialize(){
    return {
      reportContent: this.reportContent,
      reportType: this.reportType,
      creator: this.creator,
      reported: this.reported
    }
  }

}
