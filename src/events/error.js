const Stats = require('../database/models/stats');

module.exports = async(client, error) => {
    console.error(error);

    const reqStats = await Stats.findOne();
    reqStats.errs++;
    reqStats.save();
}
