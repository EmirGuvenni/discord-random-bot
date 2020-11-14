require('dotenv').config({path: __dirname + '/.env'});
const Discord = require('discord.js');
require('./database/connect_db');
const client = new Discord.Client({partials: ['MESSAGE']});
const {registerCommands, registerEvents, registerHandlers} = require('./registry');
const Stats = require('./database/models/stats');
console.log("Starting Random Botsons...");

(async() => {
    await client.login(process.env.TOKEN);
    console.log("Logged in");
    client.commands = new Map();
    client.handlers = new Map();
    await registerEvents(client, './events');
    await registerCommands(client, './commands');
    await registerHandlers(client, './handlers');
    // Set bot activity
    await client.user.setActivity("/random help");
    // Create a stats document if doesn't already exists
    if(!await Stats.findOne()){
        try{
            const newStats = new Stats();
            newStats.save();
            console.log("Created new stats document");
        }
        catch(err) {
            client.handlers.get("error")(client, err, __filename);
        }
    }
    console.log("Random Botsons is ready");
})();
