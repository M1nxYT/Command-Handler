module.exports = async (client) => {
  console.clear()
  console.log(`Ready on ${client.guilds.cache.size} servers!`);
  client.user.setActivity(`${client.config.bot.status}`, { type: "WATCHING" });
};