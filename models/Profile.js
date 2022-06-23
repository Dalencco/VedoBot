const { model, Schema } = require('mongoose');

const profileSchema = new Schema({
    guildid: String,
    userid: String,
    bg: String,
    description: String,
    insigneas: Array,
    rep: Number,
    rol: String,
    colorran: Number
}, {
    versionKey: false,
    timestamps: false
})

module.exports = model('Profile', profileSchema);