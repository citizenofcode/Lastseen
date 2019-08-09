const lastseen = require('../Util/lastseen.js');
const paginate = require('../Util/paginate.js');
const parseUsers = require('../Util/parseUsers.js');
require('moment-duration-format');

exports.exec = async (message, args) => {
	const users = parseUsers(message.client, args);
	if (!users || !users.size) return message.channel.send('No users provided!');
	const embeds = [];
	users.forEach(user => {
		embeds.push(lastseen(message.client, user));
	});
	if (embeds.length === 1) return message.channel.send(await embeds[0]);
	paginate(embeds, message);

};

exports.inhibitor = (message) => {
	return message.client.config.owners.includes(message.author.id);
};

exports.help = {
	name: 'lastseen',
	aliases: ['seen'],
	examples: ['seen @JoeGamez', 'seen 524817579202838551'],
	usage: 'seen <users>',
	description: 'Checks when a user was last online.',
	cooldown: 3,
};
