const { Schema, model } = require("mongoose");

const Rank = new Schema({
    guildid: String,
    userid: String,
    xp: Number,
    level: Number,
    xpreq: Number
}, {
    versionKey: false,
    timestamps: false
});

module.exports = model("Rank", Rank);