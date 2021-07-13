/* Commented Command in Test.js */

module.exports = {
	name: 'Reload',
	icon: '🔄',
	description: 'Reload a command without restarting the bot!',
	aliases: [],
	category: 'Bot Admin Commands',
	utilisation: '{prefix}Ping',
	requiredArgs: [],
	requiredPerms: '',
	botAdminOnly: true,

	execute: async (client, message, args) => {
		try {
		}
		catch (err) {
			if(client.config.bot.debug){
				console.log(err)
			}
			return
		}
	},
};