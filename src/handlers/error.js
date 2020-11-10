const Stats = require('../database/models/stats');
const embed = require('discord.js').MessageEmbed;

module.exports = {
    run: async (client, err, file) => {
        try{
            const reqStats = await Stats.findOne();
            reqStats.errs++;
            reqStats.save();
        }
        catch(err){
            client.channels.cache.get(process.env.ERROR_CHANNEL).send( __filename + "\n" +err);
        }

        client.channels.cache.get(process.env.ERROR_CHANNEL).send(embed.debug(file, err.stack));
    },
    description: "reports errors to the developer server"
}
