class HTMLActuator {
	static addMessage(username, message) {
		if ($('#messageContainer div h6:last').text() === username) {
			const newMessageText = $('<p></p>').text(message);
			$('#messageContainer div p:last').append(newMessageText);
		} else {
			const newMessageDiv = $('<div></div>').addClass('message-group');
			newMessageDiv.append($('<h6></h6>').text(username));
			newMessageDiv.append($('<p></p>').text(message));
			$('#messageContainer').append(newMessageDiv);
		}
	}
}

HTMLActuator.addMessage('zack', 'Hello');