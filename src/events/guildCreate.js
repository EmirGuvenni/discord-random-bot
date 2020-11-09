const embed = require('discord.js').MessageEmbed;

module.exports = async(client, guild) => {
    console.log(guild.ownerID);
    let owner = await client.users.cache.get(guild.ownerID);

    let joinEmbed = new embed()
        .setColor(0xFCFCFC)
        .setTitle(guild.name)
        .setDescription([
            `**Guild ID:** ${guild.id}`,
            `**Owner ID:** ${owner.id}`,
            `**Owner tag:** ${owner.username}#${owner.discriminator}`
        ])
    client.channels.cache.get(process.env.JOIN_CHANNEL).send(joinEmbed);

    let newGuildEmbed = new embed()
        .setColor(0xFCFCFC)
        .setTitle(`Hello ${owner.username}!`)
        .setDescription([
            'To get started use the "/random help" command or flip a coin with "/random flip"!',
            `For more info, please visit ${process.env.HOMEPAGE}`
        ]);
    await owner.send(newGuildEmbed);
}
