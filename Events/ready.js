module.exports = (client) => {
	client.user.setActivity('you', { type: 'WATCHING' });
	console.log('Client is ready.');
};