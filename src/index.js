require('dotenv').config({path: __dirname + '/.env'});
const Discord = require('discord.js');
require('./database/connect_db');
const client = new Discord.Client({partials: ['MESSAGE', 'REACTION', 'MESSAGE_DELETE']});
const {registerCommands, registerEvents, registerHandlers} = require('./registry');

(async() => {
    await client.login(process.env.BOT_TOKEN);
    client.commands = new Map();
    client.plugins = new Map();
    await registerEvents(client, './events');
    await registerCommands(client, './commands');
    await registerHandlers(client, './handlers');
})();
