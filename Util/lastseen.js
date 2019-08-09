const { RichEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

module.exports = async (client, user) => {
	let lastseen = 'Unknown (Not enough information gathered)';
	const embed = new RichEmbed()
		.setColor(client.config.color)
		.setTitle(`${user.tag} was last seen`)
		.setTimestamp();
	const onlineStatus = ['dnd', 'idle', 'online'];
	if (onlineStatus.includes(user.presence.status)) { lastseen = 'Right now'; }
	else {
		lastseen = await client.db.get(user.id);
		if (lastseen) lastseen = `${moment.duration(Date.now() - lastseen).format('D [days], H [hourss], m [minutes] [and] s [seconds]')} ago`;
		else lastseen = 'Unknown (Not enough information gathered)';
	}
	embed.setDescription(lastseen);
	return embed;

};
