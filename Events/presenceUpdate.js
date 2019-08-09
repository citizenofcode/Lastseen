module.exports = async (client, oldMember, newMember) => {
	if (newMember.user.presence.status === 'offline') {
		await client.db.set(newMember.user.id, Date.now());
		return;
	}
};