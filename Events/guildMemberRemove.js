module.exports = async (client, member) => await client.db.delete(member.user.id);
