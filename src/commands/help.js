const embed = require('discord.js').MessageEmbed;
const Stats = require('../database/models/stats');

module.exports = {
    run: async(client, message) => {
        // Create an embed
        let helpEmbed = new embed()
            .setColor(0xFCFCFC)
            .setTitle("Command list")
            .setDescription([
                "**card:** Picks a random card.",
                "**dice:** Rolls the dice.",
                "**flip:** Flips a coins.",
                "**invite:** Sends a link to bots homepage",
                "**range:** Returns a random number between the range user has given.",
                "**select:** Picks a random argument from the array"
            ]);
        // Send the embed
        await message.channel.send(helpEmbed);

        // Save stat
        try {
            const reqStats = await Stats.findOne();
            reqStats.help++;
            reqStats.save();
        }
        catch(err) {
            client.handlers.get("error")(client, err, __filename);
        }
    },
    aliases: ["commands"],
    description: "returns the help list"
}
