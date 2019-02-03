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
		const topicsContainer = $('#topicsContainer');
		const newTopicDiv = $('<a href="#"></a>').addClass('list-group-item list-group-item-action');
		newTopicDiv.attr('id', id);
		newTopicDiv.text(title);
		topicsContainer.append(newTopicDiv)
	}

	static showChat() {
		$('#chat').show();
		$('#topics').hide();
		$('#topic').hide();

		$('#homeLink').addClass('active');
		$('#topicsLink').removeClass('active');
	}

	static showTopics() {
		$('#chat').hide();
		$('#topics').show();
		$('#topic').hide();

		$('#homeLink').removeClass('active');
		$('#topicsLink').addClass('active');
	}

	static displayTopic(title, comments) {
		$('#chat').hide();
		$('#topics').hide();
		$('#topic').show();

		console.log(title, comments);
	}
}