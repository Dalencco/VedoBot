const client = require("../index");

client.on("ready", () => {
    client.user.setActivity(`MD PARA SOPORTE`, { type: 'WATCHING' })
    console.log(`${client.user.tag} Is Now Ready`)
});
