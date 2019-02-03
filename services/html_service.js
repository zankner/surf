class HTMLService {
	static addMessage(displayName, message) {
		const messageContainer = $('#messageContainer');
		if ($('#messageContainer div h6:last').text() === displayName) {
			const newMessageText = $('<p></p>').text(message);
			$('#messageContainer div p:last').append(newMessageText);
		} else {
			const newMessageDiv = $('<div></div>').addClass('message-group');
			newMessageDiv.append($('<h6></h6>').text(displayName));
			newMessageDiv.append($('<p></p>').text(message));
			messageContainer.append(newMessageDiv);
		}

		messageContainer.scrollTop(messageContainer[0].scrollHeight);
	}

	static addTopic(id, title) {
		// Format for topics:
		// <a href="#" class="list-group-item list-group-item-action">Title</a>
		// Must be added as a child of #forumsListContainer
	}
}