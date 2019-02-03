class ReportMessage {
	constructor(sender, timestamp, reportContent, reportType, reported) {
		this.id = sender + timestamp.toString();
		this.reportContent = data.reportContent;
		this.reportType = data.reportType;
		this.sender = data.sender;
		this.reported = data.reported;
	}

	serialize() {
		return {
			id: this.id,
			reportContent: this.reportContent,
			reportType: this.reportType,
			sender: this.sender,
			reported: this.reported
		};
	}
}
