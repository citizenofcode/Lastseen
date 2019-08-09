const { RichEmbed } = require('discord.js');
const ms = require('ms');
const moment = require('moment');
require('moment-duration-format');

module.exports = async (client, user) => {
	const warnTime = ms(client.config.inactivityWarning) || null;
	let lastseen = 'Unknown (Not enough information gathered)';
	const embed = new RichEmbed()
		.setColor(client.config.color)
		.setTitle(`${user.tag} was last seen`)
		.setTimestamp();
	const onlineStatus = ['dnd', 'idle', 'online'];
	if (onlineStatus.includes(user.presence.status)) { lastseen = 'Right now'; }
	else {
		lastseen = await client.db.get(user.id);
		if (lastseen) {
			lastseen = `${moment.duration(Date.now() - lastseen).format('D [days], H [hours], m [minutes] [and] s [seconds]')} ago`;
			if (!warnTime) return;
			if ((Date.now() - (await client.db.get(user.id))) > warnTime) {
				embed.addField('⚠ Inactivity Warning', `This user has not been online for more then ${ms(warnTime, { long: true })}!`);
				embed.setColor(0xed2939);
			}
		}
		else { lastseen = 'Unknown (Not enough information gathered)'; }
	}
	embed.setDescription(lastseen);
	return embed;

};
