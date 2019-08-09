const { RichEmbed } = require('discord.js');

exports.exec = async (message, args) => {
	if (!args.length) return message.channel.send('Nothing to reload!');

	if (args[0] === 'all') {
		message.client.commands.forEach(async cmd => {
			await message.client.unloadCommand(cmd.location, cmd.help.name);
			message.client.loadCommand(cmd.location, cmd.help.name);
		});
		message.channel.send(new RichEmbed().setTitle('Reloaded all commands!').setColor(message.client.config.color).setTimestamp());
		return;
	}
	const name = args[0].toLowerCase();
	const command = message.client.findCommand(name);
	if (!command) return message.channel.send('No such command of that name or alias!');
	await message.client.unloadCommand(command.location, command.help.name);
	message.client.loadCommand(command.location, command.help.name);
	message.channel.send(new RichEmbed().setTitle(`Reloaded command ${command.help.name}!`).setTimestamp().setColor(message.client.config.color));
};

exports.inhibitor = (message) => {
	return message.client.config.owners.includes(message.author.id);
};

exports.help = {
	name: 'reload',
	aliases: ['r'],
	examples: ['reload all', 'reload help'],
	usage: 'reload <all|command>',
	description: 'Reloads a command.',
	cooldown: 3,
};