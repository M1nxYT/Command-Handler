module.exports = {
	bot: {
		prefix: 'mod!',	/* Prefix for the bot */
		status: 'for bad actors!',	/* Will be prefixed by 'WATCHING' */
		unknown: false, /* Show error messages for missing perms/args etc */
		debug: true, /* Show all errors in console */
		mentionHelp: true, /* Show help menu on ping */
		support: {
			name: 'Support Server', /* Name of support server */
			link: 'https://discord.gg/ABCDEFGH' /* Link to support server */
		},
		defaults: { // Keeps user informed on what the bot is doing
			success: { // Used for Successful actions
				color: '#00FF00',
				emote: '✔️'
			},
			loading: { // Used for Loading actions
				color: '#FFA500',
				emote: '⏱️'
			},
			failure: { // Used for Failed actions
				color: '#FF0000',
				emote: '❌'
			},
			ping: { // Used for Ping actions
				color: '#5F9EA0',
				emote: '🏓'
			},
			help: { // Used for Help actions
				color: '#ffffff',
				emote: '❓'
			}
		},
	},
	owner: { /* Will be displayed in footers. Also add to admin list */
		name: 'MinxterYT', /* Owner Name */
		id: '719292655963734056', /* Owner ID */
	},
	admins: [ /* Can run admin commands */
		'719292655963734056', /* Admin ID */
		'123456789012345678', /* Admin ID */
	],
}