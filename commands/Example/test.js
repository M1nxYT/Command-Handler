/* This command is commented */

module.exports = {
	name: 'Test', /* Command name */
	icon: '🧪', /* Command icon */
	description: 'Just a test command!', /* Command Description */
	aliases: ['test1', 'test2'], /* Command aliases separated with commas */
	category: 'Admin Commands', /* Command category */
	utilisation: '{prefix}Test', /* Info for help command */
	requiredArgs: ['Test Arg'], /* Required arguments labels seperated by commas */
	requiredPerms: 'ADMINISTRATOR',  /* Required permissions, default should be empty*/
	botAdminOnly: false,

	execute: async (client, message, args) => { /* What to do when command runs */
		try {
			message.channel.send({
				content: 'Test Message `' + args.join(" ").replace(new RegExp("@", "g"), '').replace(new RegExp(" ", "g"), '` `') + '`' /* Currently just sends a message containing a test message and args provided */
			})
		}
		catch (err) { /* This catches errors and logs them and prevents *most* bot crashes */
			if(client.config.bot.debug){
				console.log(err)
			}
			return
		}
	},
};