module.exports = (client, args) => {
	const parseUser = (text) => {
		const match = text.match(/<@!?(\d+)/);
		if ((match) && client.users.has(match[1])) return client.users.get(match[1]);
		if (client.users.has(text)) return client.users.get(text);
		return null;
	};
	const res = new Set();
	for (const arg of args) {
		parseUser(arg) ? res.add(parseUser(arg)) : {};
	}
	return res;
};