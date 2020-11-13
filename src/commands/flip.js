const embed = require('discord.js').MessageEmbed;
const Stats = require('../database/models/stats');
const {MessageAttachment} = require('discord.js');

module.exports = {
    run: async(client, message) => {
        // Flip a coin
        let coin;
        (Math.random() <= 0.5) ? coin = "heads" : coin = "tails";

        // Get the coin image
        let attachment = new MessageAttachment(`./src/images/coin/${coin}.png`, `${coin}.png`);

        // Create an embed
        let rollEmbed = new embed()
            .setColor(0xFCFCFC)
            .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
            .setTitle("Flipped a coin")
            .setDescription(`Coin: **${coin}**`)
            .attachFiles(attachment)
            .setImage(`attachment://${coin}.png`);
        // Send the embed
        await message.channel.send(rollEmbed);

        // Save stats
        try {
            const reqStats = await Stats.findOne();
            reqStats.flip++;
            reqStats.save();
        }
        catch(err) {
            client.handlers.get("error")(client, err, __filename);
        }
    },
    aliases: ["coin"],
    description: "flips a coin"
}
