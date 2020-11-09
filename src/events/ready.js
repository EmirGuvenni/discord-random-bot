const {createStream} = require('table');
const tableConfig = require('../table_config');
const {commandStatus, eventStatus, handlerStatus} = require('../registry');
const Stats = require('../database/models/stats');

module.exports = async(client) => {
    await client.user.setActivity("/random help");

    await loadTable(commandStatus, 50);
    console.log("\n");
    await loadTable(eventStatus, 50);
    console.log("\n");
    await loadTable(handlerStatus, 50);
    console.log("\n");

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

function loadTable(arr, interval) {
    let fn, i = 0, stream = createStream(tableConfig);
    return new Promise((resolve) => {
        fn = setInterval(() => {
            if(i === arr.length) {
                clearInterval(fn);
                resolve();
            }
            else {
                stream.write(arr[i]);
                i++;
            }
        }, interval);
    })
}
