class HTMLActuator {
	static addMessage(sender, message) {
		if ($('#messageContainer div h6:last').text() === sender) {
			const newMessageText = $('<p></p>').text(message);
			$('#messageContainer div p:last').append(newMessageText);
		} else {
			const newMessageDiv = $('<div></div>').addClass('message-group');
			newMessageDiv.append($('<h6></h6>').text(sender));
			newMessageDiv.append($('<p></p>').text(message));
			$('#messageContainer').append(newMessageDiv);
		}
	}
}