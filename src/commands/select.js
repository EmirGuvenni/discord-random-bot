const embed = require('discord.js').MessageEmbed;
const Stats = require('../database/models/stats');

module.exports = {
    run: async (client, message, args) => {
        // Check if there are any arguments
        if(!args[0]) {
            // Create a warning embed
            let checkEmbed = new embed()
                .setColor(0xFCFCFC)
                .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
                .setTitle("Error")
                .setDescription("There are no arguments to select from.");
            // Send the embed
            return message.channel.send(checkEmbed);
        }

        // Get a random argument index
        let selection = Math.floor(Math.random() * args.length);

        // Create an embed
        let selectEmbed = new embed()
            .setColor(0xFCFCFC)
            .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
            .setTitle("Selected")
            .setDescription(`Selection: **${args[selection]}**`);
        // Send the embed
        await message.channel.send(selectEmbed);

        //  Save stats
        try {
            const reqStats = await Stats.findOne();
            reqStats.select++;
            reqStats.save();
        }
        catch(err) {
            client.handlers.get("error")(client, err, __filename);
        }
    },
    aliases: [],
    description: "selects a random argument"
}
