require('dotenv').config({path: __dirname + '/.env'});
const Discord = require('discord.js');
require('./database/connect_db');
const client = new Discord.Client({partials: ['MESSAGE']});
const {registerCommands, registerEvents, registerHandlers} = require('./registry');
console.log("Starting Random Botsons...");

(async() => {
    await client.login(process.env.TOKEN);
    console.log("Logged in");
    client.commands = new Map();
    client.handlers = new Map();
    await registerEvents(client, './events');
    await registerCommands(client, './commands');
    await registerHandlers(client, './handlers');
})();
