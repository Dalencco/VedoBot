const { Schema, model } = require('mongoose');

const ConfigSchema = new Schema({
    guildid: String,
    welcomechannel: String,
    rankchannel: String,
    rolmod: String,
    logschannel: String
}, {
    versionKey: false,
    timestamps: false
})

module.exports = model('Config', ConfigSchema)