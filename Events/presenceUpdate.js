module.exports = async (client, oldMember, newMember) => {
	if (oldMember.presence.status === newMember.presence.status) return;
	if (newMember.presence.status === 'offline') {
		await client.db.set(newMember.user.id, Date.now());
		return;
	}
};
