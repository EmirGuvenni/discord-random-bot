const Stats = require('../database/models/stats');

module.exports = async(client) => {
    // Set bot activity
    await client.user.setActivity("/random help");

    // Create a stats document if doesn't already exists
    if(!await Stats.findOne()){
        try{
            const newStats = new Stats();
            newStats.save();
            console.log("Created new stats document");
        }
        catch(err) {
            client.handlers.get("error")(client, err, __filename);
        }
    }
}
