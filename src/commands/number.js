const embed = require('discord.js').MessageEmbed;
const Stats = require('../database/models/stats');

module.exports = {
    run: async(client, message, args) => {
        let num;
        
        if(args[0] && isNaN(args[0])) {
            // Create a warning embed
            let warnEmbed = new embed()
                .setColor(0xFCFCFC)
                .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
                .setTitle("Error")
                .setDescription("The provided argument must be a number.");
            // Send the embed
            return message.channel.send(warnEmbed);
        }
        // Check if there's a provided number
        else if(!args[0])
            num = Math.floor((Math.random() * 10) + 1);
        else
            num = Math.floor((Math.random() * args[0]) + 1);

        // Create an embed
        let checkEmbed = new embed()
            .setColor(0xFCFCFC)
            .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
            .setTitle("Picked a number")
            .setDescription(`Number: **${num}**`);
        // Send the embed
        await message.channel.send(checkEmbed);

        //  Save stats
        try {
            const reqStats = await Stats.findOne();
            reqStats.number++;
            reqStats.save();
        }
        catch(err) {
            client.handlers.get("error")(client, err, __filename);
        }
    },
    aliases: ["int"],
    description: "picks a random number between 1 and the provided number or 10"
}
