const fs = require('fs');
const dotenv = require('dotenv')
const discord = require('discord.js');

const client = new discord.Client({ disableMentions: 'everyone' });

client.fetch = require("node-fetch");
client.config = require('./config.js');

client.commands = new discord.Collection();

fs.readdirSync('./commands').forEach(dirs => {
  const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

  for (const file of commands) {
    const command = require(`./commands/${dirs}/${file}`);
    console.log(`Loading command ${file}`);
    client.commands.set(command.name.toLowerCase(), command);
  };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
  console.log(`Loading discord.js event ${file}`);
  const event = require(`./events/${file}`);
  client.on(file.split(".")[0], event.bind(null, client));
};


client.on("guildCreate", guild => {
  console.log("Joined guild => " + guild.name);
  fs.appendFile(`Event Log.txt`, `Joined guild =>	${guild.name}\n`, (err) => {
    if (err) throw err;
  });
});

client.on("guildDelete", guild => {
  console.log("Left guild => " + guild.name);
  fs.appendFile(`Event Log.txt`, `Left guild =>	${guild.name}\n`, (err) => {
    if (err) throw err;
  });
});


client.login(process.env.TOKEN)