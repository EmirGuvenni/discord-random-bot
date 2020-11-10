const mongoose = require('mongoose');

const botSchema = mongoose.Schema({
    errs: {type: Number, min: 0, default: 0, required: true},
    help: {type: Number, min: 0, default: 0, required: true},
    dice: {type: Number, min: 0, default: 0, required: true},
    flip: {type: Number, min: 0, default: 0, required: true},
    card: {type: Number, min: 0, default: 0, required: true},
    range: {type: Number, min: 0, default: 0, required: true},
    select: {type: Number, min: 0, default: 0, required: true},
    random: {type: Number, min: 0, default: 0, required: true},
    invite: {type: Number, min: 0, default: 0, required: true}
});

module.exports = mongoose.model("Botstat", botSchema);
