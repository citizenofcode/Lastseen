const { RichEmbed } = require('discord.js');
// eslint-disable-next-line no-unused-vars
exports.exec = (message, args) => {
	const embed = new RichEmbed().setColor(message.client.config.color).setTitle('Ping?');
	message.channel.send(embed)
		.then(msg => message.edit(embed.setTitle('Pong!').setDescription(`**-** Latency: \`${message.createdTimestamp() - msg.createdTimestamp()}\`ms\n\n**-** API Latency: \`${message.client.ping}\`ms`)));
};

exports.help = {
	name: 'ping',
	aliases: ['pong'],
	examples: ['ping'],
	usage: 'ping',
	description: 'Ping? Pong!',
	cooldown: 3,
};