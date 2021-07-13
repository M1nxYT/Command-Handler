module.exports = (client, message) => {

	if (message.author.bot || message.channel.type === 'dm') return;
	const prefix = client.config.bot.prefix;
	if (message.content.toLowerCase().includes(client.user.id)) {
		const cmd = client.commands.get('help') || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes('help'));
		if (cmd) cmd.execute(client, message, '');
		return
	}

	if (message.content.toLowerCase().indexOf(prefix.toLowerCase()) !== 0) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

	if (!cmd) {
		if (client.config.bot.unknown) {
			message.channel.send(client.config.bot.defaults.failure.emote + ` Unrecognized command name!`);
		}
		return
	};

	if (cmd.botAdminOnly) {
		if (!client.config.admins.includes(message.member.id)) {
			message.channel.send({
				embed: {
					title: "Command Failed",
					description: client.config.bot.defaults.failure.emote + ' You are not an admin of this bot',
					color: client.config.bot.defaults.failure.color,
					footer: {
						text: client.config.owner.name + "'s Bot - " + cmd.name.toUpperCase(),
					},
					timestamp: new Date(),
				}
			})
		}
		return
	}

	if (cmd.requiredPerms.length > 0) {
		if (!message.member.hasPermission(cmd.requiredPerms)) {
			if (client.config.bot.unknown) {
				message.channel.send({
					embed: {
						title: "Command Failed",
						description: client.config.bot.defaults.failure.emote + ' You lack required permissions - `' + cmd.requiredPerms + '`',
						color: client.config.bot.defaults.failure.color,
						footer: {
							text: client.config.owner.name + "'s Bot - " + cmd.name.toUpperCase(),
						},
						timestamp: new Date(),
					}
				})
			}
			return
		}
	}

	if (args.length < cmd.requiredArgs.length) {
		if (client.config.bot.unknown) {
			message.channel.send({
				embed: {
					title: "Command Failed",
					description: client.config.bot.defaults.failure.emote + ' Missing Arguments - `' + cmd.requiredArgs.toString().replace(',', ', ') + '`',
					color: client.config.bot.defaults.failure.color,
					footer: {
						text: client.config.owner.name + "'s Bot - " + cmd.name.toUpperCase(),
					},
					timestamp: new Date(),
				}
			})
		}
		return
	}

	if (cmd) cmd.execute(client, message, args);
};