module.exports = async(client, message) => {
    if(!message.content.startsWith("/random"))
        return;

    const args = message.content.slice(8).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(client.commands.get(command))
        return client.commands.get(command)(client, message, args);
}
