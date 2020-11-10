const embed = require('discord.js').MessageEmbed;
const Stats = require('../database/models/stats');

module.exports = {
    run: async(client, message) => {
        let helpEmbed = new embed()
            .setColor(0xFCFCFC)
            .setTitle("Command list")
            .setDescription([
                "**/dice:** Rolls a 6 face dice.",
                "**/flip:** Flips a coins.",
                "**/random:** ",
                "**/range:** Returns a random number between the range user has given.",
                "**/select:** Returns a random argument from the array",
                "**/card:** Returns a random card."
            ]);

        await message.channel.send(helpEmbed);

        try {
            const reqStats = await Stats.findOne();
            reqStats.help++;
            reqStats.save();
        }
        catch(err) {
            client.handlers.get("error")(client, message, err, __filename);
        }
    },
    aliases: ["commands"],
    description: "returns the help list"
}
