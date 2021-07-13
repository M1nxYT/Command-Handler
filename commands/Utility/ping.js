/* Commented Command in Test.js */

module.exports = {
	name: 'Ping',
	icon: '🏓',
	description: 'Checks the bot\'s latency!',
	aliases: ['pong'],
	category: 'Utility Commands',
	utilisation: '{prefix}Ping',
	requiredArgs: [],
	requiredPerms: '',
	botAdminOnly: false,

	execute: async (client, message, args) => {
		try {
			result = {
				title: "Ping loading",
				description: client.config.bot.defaults.loading.emote + ` Loading!`,
				color: client.config.bot.defaults.loading.color,
				footer: {
					text: client.config.owner.name + "'s Bot - " + "Ping",
				},
				timestamp: new Date(),
			}

			msg = await message.channel.send({embed: result})

			result.description = client.config.bot.defaults.ping.emote + ` Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`
			result.title = "Ping Results"
			result.color = client.config.bot.defaults.ping.color
			result.timestamp = new Date(),

			msg.delete()

			message.channel.send({embed: result})
		}
		catch (err) {
			if(client.config.bot.debug){
				console.log(err)
			}
			return
		}
	},
};