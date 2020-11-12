const embed = require('discord.js').MessageEmbed;
const Stats = require('../database/models/stats');
const {MessageAttachment} = require('discord.js');
const Card = require('../classes/card');

module.exports = {
    run: async(client, message) => {
        // Get a random card
        let card = new Card();
        let attachment = new MessageAttachment(`./src/images/cards/${card.img}`, `${card.img}`);

        // Create an embed
        let cardEmbed = new embed()
            .setColor(0xFCFCFC)
            .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
            .setTitle("Picked a card")
            .setDescription([
                `Suit: **${card.suit}**`,
                `Rank: **${card.rank}**`
            ])
            .attachFiles(attachment)
            .setImage(`attachment://${card.img}`);
        // Send the embed
        await message.channel.send(cardEmbed);

        //  Save stats
        try {
            const reqStats = await Stats.findOne();
            reqStats.card++;
            reqStats.save();
        }
        catch(err) {
            client.handlers.get("error")(client, err, __filename);
        }
    },
    aliases: [],
    description: "deals a random card"
}
