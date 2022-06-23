const { Client, Collection } = require("discord.js");
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');

const client = new Client({
    partials: ["CHANNEL"],
    intents: 32767
});

client.distube = new DisTube(client, {
    nsfw: false,
    searchSongs: 5,
    searchCooldown: 30,
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddListWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});

module.exports = client;

client.timeout = new Collection()
client.commands = new Collection();
client.config = require("./config.json");

require("./handler")(client);

client.login(client.config.token);
