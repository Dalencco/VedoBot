const { MessageEmbed } = require('discord.js');
const client = require('../index');
const Config = require('../models/Config');

client.on("guildUpdate", async (oldGuild, newGuild) => {

    const configGuild = await Config.findOne({ guildid: newGuild.id })

    if (!configGuild || !configGuild.logschannel) return;

    let embed_icon = new MessageEmbed()
        .setTitle(`Se actualizo el Icon del Server`)
        .setThumbnail(newGuild.iconURL())
        .setColor("RED")
        .setFooter("Logs by Vedo Bot", oldGuild.iconURL())

    let embed_name = new MessageEmbed()
        .setTitle(`Se actualizo el Nombre del Servidor`)
        .setDescription(`De ${oldGuild.name} a ${newGuild.name}`)
        .setThumbnail(newGuild.iconURL())
        .setColor("RED")
        .setFooter(
            `Logs by Vedo Bot`,
            client.user.displayAvatarURL()
        )
        .setTimestamp()

    if (oldGuild.iconURL() !== newGuild.iconURL()) {
        return client.channels.cache.get(configGuild.logschannel).send({ embeds: [embed_icon] })
    }

    if (oldGuild.name !== newGuild.name) {
        return client.channels.cache.get(configGuild.logschannel).send({ embeds: [embed_name] })
    }
    
    return client.channels.cache.get(configGuild.logschannel).send(`Se actualizo ${oldGuild.name} a ${newGuild.name}`)
})