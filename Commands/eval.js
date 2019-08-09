const { RichEmbed } = require('discord.js');

exports.exec = (message, args) => {
	function clean(text) {
		if (typeof (text) === 'string') {return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));}
		else {return text;}
	}
	if (!args.length) {
		return message.channel.send('There\'s nothing to evalulate!');
	}
	try {
		let code = args.join(' ');
		let silent = false;
		if (code.startsWith('--s') || code.startsWith('--silent')) {
			silent = true;
			code = args.slice(1).join(' ');
		}
		let evaled = eval(code);

		if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
		let send = `\`\`\`js\n${clean(evaled)}\n\`\`\``;
		send = send.replace(message.client.config.token, 'BOT_TOKEN');
		let printOutput = send;
		if (send.toString().length > 1024) printOutput = 'Output too long to show.';
		const embed = new RichEmbed()
			.setTitle('Evalulate Code')
			.setColor('GREEN')
			.addField('Input', `\`\`\`js\n${code}\n\`\`\``)
			.addField('Output', printOutput);
		if (!silent) message.channel.send(embed);

	}
	catch (err) {
		const error = `\`\`\`js\n${clean(err)}\n\`\`\``;
		const errorembed = new RichEmbed()
			.setTitle('Error')
			.setColor('RED')
			.setDescription(error);
		message.channel.send(errorembed);
	}
};

exports.inhibitor = (message) => {
	return message.client.config.owners.includes(message.author.id);
};

exports.help = {
	name: 'eval',
	aliases: ['e'],
	examples: ['eval message.client.user.setActivity(\'Hello!\');'],
	usage: 'eval <code>',
	description: 'Evaluates arbitrary JavaScript code.',
	cooldown: 3,
};
