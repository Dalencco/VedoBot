const { Schema, model } = require('mongoose');

const Warns = new Schema({
    warnid: String,
    userid: String,
    modid: String,
    warnmsg: String
}, {
    versionKey: false,
    timestamps: false
})

module.exports = model('Warns', Warns);