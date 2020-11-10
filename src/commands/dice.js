const embed = require('discord.js').MessageEmbed;
const Stats = require('../database/models/stats');

module.exports = {
    run: async(client, message) => {
        let roll = Math.floor((Math.random() * 6) + 1);
        let rollEmbed = new embed()
            .setColor(0xFCFCFC)
            .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
            .setTitle("Rolled the dice")
            .setDescription(`Dice: ${roll}`)
        await message.channel.send(rollEmbed);

        try {
            const reqStats = await Stats.findOne();
            reqStats.dice++;
            reqStats.save();
        }
        catch(err) {

        }
    },
    aliases: ["roll"],
    description: ""
}
