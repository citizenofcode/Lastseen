const moment = require('moment');
require('moment-duration-format');
const { RichEmbed, version } = require('discord.js');

// eslint-disable-next-line no-unused-vars
exports.exec = (message, args) => {
	const duration = moment.duration(message.client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
	const embed = new RichEmbed()
		.setTitle('Statistics')
		.setColor(message.client.config.color)
		.addField('Memory usage', (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB')
		.addField('Uptime', duration)
		.addField('Users', message.client.users.size.toLocaleString())
		.addField('Channels', message.client.channels.size.toLocaleString())
		.addField('Servers', message.client.guilds.size.toLocaleString())
		.addField('Discord.js', 'v' + version)
		.addField('Node', process.version)
		.addField('Creator', 'JoeGamez#7087');
	message.channel.send(embed);
};

exports.help = {
	name: 'info',
	aliases: ['information', 'stats'],
	examples: ['info'],
	usage: 'info',
	description: 'Some information about the bot.',
	cooldown: 3,
};