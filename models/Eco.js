const { Schema, model } = require('mongoose');

const ecoSchema = new Schema({
    guildid: String,
    userid: String,
    money: Number,
    bank: Number
}, {
    versionKey: false,
    timestamps: false
});

module.exports = model('Eco', ecoSchema);
