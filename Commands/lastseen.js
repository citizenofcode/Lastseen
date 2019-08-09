const { RichEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

exports.exec = async (message, args) => {
	if (!args.length) return message.channel.send('No user provided.');
	const user = (message.mentions.users.first() && args[0].match(/<@!?\d+/)) ? message.mentions.users.first() : message.client.users.get(args[0]);
	if (!user) return message.channel.send('Hey, that\'s not a valid user!');
	let lastseen = 'Unknown (Not enough information gathered)';
	const embed = new RichEmbed()
		.setColor(message.client.config.color)
		.setTitle(`${user.tag} was last seen`)
		.setTimestamp();
	const onlineStatus = ['dnd', 'idle', 'online'];
	if (onlineStatus.includes(user.presence.status)) { lastseen = 'Right now'; }
	else {
		lastseen = await message.client.db.get(user.id);
		if (lastseen) lastseen = `${moment.duration(Date.now() - lastseen).format('D [days], H [hourss], m [minutes] [and] s [seconds]')} ago`;
		else lastseen = 'Unknown (Not enough information gathered)';
	}
	message.channel.send(embed.setDescription(lastseen));
};

exports.inhibitor = (message) => {
	return message.client.config.owners.includes(message.author.id);
};

exports.help = {
	name: 'lastseen',
	aliases: ['seen'],
	examples: ['seen @JoeGamez', 'seen 524817579202838551'],
	usage: 'seen <user>',
	description: 'Checks when a user was last online.',
	cooldown: 3,
};