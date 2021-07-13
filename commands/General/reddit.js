/* Commented Command in Test.js */

const discord = require('discord.js');

function truncateString(str, num) {
	if (str.length > num) {
		return str.slice(0, num) + "...";
	} else {
		return str;
	}
}

module.exports = {
	name: 'Reddit',
	icon: '🔍',
	description: 'Fetch something from reddit!',
	aliases: ['r/'],
	category: 'General Commands',
	utilisation: '{prefix}Reddit <subreddit> <count>',
	requiredArgs: [],
	requiredPerms: '',
	botAdminOnly: false,

	execute: async (client, message, args) => {
		try {
			type = args[0].toLowerCase()
			search = args[1]
			count = args[2]

			options = ['hot', 'new', 'top']

			if (args.length != 3) { return message.channel.send('Check your formatting! Run `' + client.config.bot.prefix + 'Help' + 'Reddit` for more info') } // fuck i wanna die

			if (!options.includes(type.toLowerCase())) { return message.channel.send('please put one of: [hot] , [new] , [top]') } // Kill ME
			if (!typeof (count) == 'string') { return message.channel.send('[1 / 3] only') } // so badly



			if (count > 3 || count < 1) { return message.channel.send('[1 / 3] only') }

			url = `https://www.reddit.com/r/${search}/${type}.json?limit=${count}`

			res = await client.fetch(url)
			json = await res.json()

			if (json.kind == 'Listing') {
				if(json.data.children.length == 0){
					message.channel.send('No Results Found!')
					return
				}

				result = {
					title: "Ping loading",
					color: client.config.bot.defaults.loading.color,
					timestamp: new Date(),
				}

				for (i = 0; i < count; i++) {
					try {
						result.title = json.data.children[i].data.title
						result.description = truncateString(json.data.children[i].data.selftext, 500).replace(new RegExp("\n\n", "g"), '\n')
						result.url = json.data.children[i].data.url

						result.footer = {
							text: client.config.owner.name + "'s Bot - " + json.data.children[i].data.subreddit_name_prefixed,
						},

						result.thumbnail = {
							url: json.data.children[i].data.thumbnail.replace('self', 'https://google.com/thiswillneverresolvehonest.png'),
						},

						result.image = {
							url: json.data.children[i].data.url,
						},

						result.fields = [{ name: 'Up Votes', value: json.data.children[i].data.ups, inline: true }, { name: 'Author', value: json.data.children[i].data.author, inline: true }]

						if (json.data.children[0].data.over_18) {
							if (message.channel.nsfw) {
								message.channel.send({ embed: result });
							}
							else {
								message.channel.send('Cannot send NSFW content in a non NSFW Channel')
							}
						}
						else {
							message.channel.send({ embed: result });
						}
					}
					catch (err) {
						if (client.config.bot.debug) {
							console.log(err)
						}
						return
					}
				}
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