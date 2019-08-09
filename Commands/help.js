const { RichEmbed } = require('discord.js');

exports.exec = (message, args) => {
	if (!args.length) {
		return message.author.send(new RichEmbed().setColor(message.client.config.color).setTitle('Lastseen Help').setTimestamp().setDescription((message.client.commands.map(cmd => `\`${cmd.help.name}\` - ${cmd.help.description}`).join('\n\n'))))
			.catch(() => message.channel.send('I was unable to DM you!'));
	}
	if (!message.client.findCommand(args.join(' '))) return message.channel.send('I was unable to find a command of that name.');

	const command = message.client.findCommand(args.join(' '));
	message.channel.send(new RichEmbed().setFooter(command.help.cooldown ? `The cooldown for this command is ${command.help.cooldown} seconds(s)` : 'No cooldown for this command.').setTitle(`\`${command.help.usage}\``).setColor(message.client.config.color).addField('Description', command.help.description).addField('Aliases', command.help.aliases ? command.help.aliases.join(', ') : 'None').addField('Examples', command.help.examples.map(example => `\`${message.client.config.prefix}${example}\``).join('\n')));
};

exports.help = {
	name: 'help',
	aliases: ['h', 'command', 'cmd'],
	examples: ['help', 'help info'],
	usage: 'help [command]',
	description: 'Shows all the commands avaliable, or shows help for a specific command.',
	cooldown: 3,
};