/* Commented Command in Test.js */

const discord = require('discord.js');

module.exports = {
	name: 'Help',
	icon: '❓',
	description: 'Displays help about commands!',
	aliases: [],
	category: 'Utility Commands',
	utilisation: '{prefix}Help',
	requiredArgs: [],
	requiredPerms: '',
	botAdminOnly: false,

	execute: async (client, message, args) => {
		try {
			if (!args[0]) {


				const generalCommands = client.commands.filter(x => x.category == 'General Commands').map((x) => x.icon + '  `' + x.name + '`').join(',  ');
				const utilityCommands = client.commands.filter(x => x.category == 'Utility Commands').map((x) => x.icon + '  `' + x.name + '`').join(',  ');
				const botAdminCommands = client.commands.filter(x => x.category == 'Bot Admin Commands').map((x) => x.icon + '  `' + x.name + '`').join(',  ');
				const adminCommands = client.commands.filter(x => x.category == 'Admin Commands').map((x) => x.icon + '  `' + x.name + '`').join(',  ');


				commands = {
					author: {
						name: client.config.bot.defaults.help.emote + ` Help Menu`,
					},
					description: 'Try running `mod!help <command>` for more info.',
					color: client.config.bot.defaults.help.color,
					fields: [
						{ name: 'General', value: generalCommands },
						{ name: 'Utility', value: utilityCommands },
						{ name: 'Admin Commands', value: adminCommands },
						{ name: 'Bot Admin Commands', value: botAdminCommands }
					],
					footer: {
						text: client.config.owner.name + "'s Bot - " + "Ping",
					},
					timestamp: new Date(),
				}

				message.channel.send({ embed: commands })
			}
			else {
				const cmd = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));
				if (!cmd) return message.channel.send(client.config.bot.defaults.failure.emote + ` Unrecognized command name!`);
				if (cmd.requiredPerms.length > 0) {
					if (!message.member.hasPermission(cmd.requiredPerms)) {
						message.channel.send({
							embed: {
								title: "Command Failed",
								description: client.config.bot.defaults.failure.emote + ' You lack required permissions to view this command - `' + cmd.requiredPerms + '`',
								color: client.config.bot.defaults.failure.color,
								footer: {
									text: client.config.owner.name + "'s Bot - " + cmd.name.toUpperCase(),
								},
								timestamp: new Date(),
							}
						});
						return
					}
				}

				const command = new discord.MessageEmbed()
				command.setColor(client.config.bot.defaults.help.color)
				command.setAuthor(client.config.bot.defaults.help.emote + ` Help Menu` + ' - ' + cmd.icon + ' ' + cmd.name)
				command.setDescription(cmd.description)
				if (cmd.aliases.length > 0) {
					command.addFields({
						name: 'Aliases:', value: '`' + cmd.aliases.toString().replace(',', '` , `') + '`'
					})
				}
				command.addFields({
					name: 'Utilisation', value: '`' + cmd.utilisation.replace('{prefix}', client.config.bot.prefix).replace(new RegExp(" <", "g"), '` `').replace(new RegExp(">", "g"), '') + '`'
				})
				command.setTimestamp()
				command.setFooter(client.config.owner.name + "'s Bot - " + "Ping");

				message.channel.send({ embed: command })

			}
		}
		catch (err) {
			if (client.config.bot.debug) {
				console.log(err)
			}
			return
		}
	},
};