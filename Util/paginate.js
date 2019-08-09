/* eslint-disable require-atomic-updates */
module.exports = async (array, message) => {
	for (const page of array) {
		array[array.indexOf(page)] = (await page).setFooter(`Page ${array.indexOf(page) + 1} of ${array.length}`);
	}
	const m = await message.channel.send(await array[0]);
	let currentPage;
	currentPage = 0;
	const acceptableEmotes = ['⏪', '◀', '⏹', '▶', '⏩'];
	await m.react('⏪');
	await m.react('◀');
	await m.react('⏹');
	await m.react('▶');
	await m.react('⏩');
	const filter = (reaction, user) => {
		return acceptableEmotes.includes(reaction.emoji.name) && user.id === message.author.id;
	};
	const collector = m.createReactionCollector(filter, {
		time: 120000,
	});
	collector.on('collect', async r => {
		if (!acceptableEmotes.includes(r.emoji.name)) return;
		switch(r.emoji.name) {
		case '⏪':
			r.remove(message.author);
			m.edit(array[0]);
			currentPage = 0;
			break;
		case '◀':
			r.remove(message.author);
			if (currentPage > 0) {
				m.edit(array[(currentPage - 1)]);
				--currentPage;
			}
			break;
		case '⏹':
			m.clearReactions();
			collector.stop();
			break;
		case '▶':
			r.remove(message.author);
			if (currentPage < (array.length - 1)) {
				m.edit(array[(currentPage + 1)]);
				++currentPage;
			}
			break;
		case '⏩':
			r.remove(message.author);
			m.edit(array[array.length - 1]);
			currentPage = array.length - 1;
			break;
		}
	});
	collector.on('end', () => {
		m.clearReactions();
	});
};