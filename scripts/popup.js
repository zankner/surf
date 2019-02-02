(function (t, a, l, k, j, s) {
	s = a.createElement('script');
	s.async = 1;
	s.src = 'https://cdn.talkjs.com/talk.js';
	a.head.appendChild(s);
	k = t.Promise;
	t.Talk = {
		v: 1, ready: {
			then: function (f) {
				if (k) return new k(function (r, e) {
					l.push([f, r, e]);
				});
				l
					.push([f]);
			}, catch: function () {
				return k && new k();
			}, c: l
		}
	};
})(window, document, []);

Talk.ready.then(function() {
	const me = new Talk.User({
		id: "123456",
		name: "Alice",
		email: "alice@example.com",
		photoUrl: "https://demo.talkjs.com/img/alice.jpg",
		welcomeMessage: "Hey there! How are you? :-)"
	});

	window.talkSession = new Talk.Session({
		appId: "tYD7OwGq",
		me: me
	});

	const other = new Talk.User({
		id: "654321",
		name: "Sebastian",
		email: "Sebastian@example.com",
		photoUrl: "https://demo.talkjs.com/img/sebastian.jpg"
	});

	const conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other))
	conversation.setParticipant(me);
	conversation.setParticipant(other);
	const inbox = talkSession.createInbox({selected: conversation});
	inbox.mount(document.getElementById("talkjs-container"));
});