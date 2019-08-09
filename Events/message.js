module.exports = (client, message) => {
	const { prefix } = client.config;
	if (!message.content.startsWith(prefix) || message.author.bot || !message.guild) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.findCommand(commandName);
	if (!command) return;

	if (command.inhibitor && !command.inhibitor(message)) return;
	if (!command.help.cooldown) return command.exec(message, args);

	if (client.cooldowns.has(message.author.id)) return message.channel.send(`You're on cooldown! Please wait ${Math.round((Date.now() - (client.cooldowns.get(message.author.id))) / 1000)} more seconds before using this command again.`);
	client.cooldowns.set(message.author.id, Date.now());
	setTimeout(() => client.cooldowns.delete(message.author.id), command.help.cooldown * 1000);

	command.exec(message, args);
};