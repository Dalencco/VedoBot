const { Message, Client, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;
const Config = require('../../models/Config');

module.exports = {
    name: "config",
    aliases: ['configuration', 'conf'],
    description: "Comando para ver las Configuraciones del Servidor",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        const configGuild = await Config.findOne({ guildid: message.guild.id })

        const cero_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡No tenemos registro del servidor en nuestra Base de Datos!`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        let dos_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡Usted no cuenta con los permisos suficientes para ejecutar este comando! Requiere de: \`ADMINISTRATOR\``)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({ embeds: [dos_embed] })

        if (!configGuild) return message.channel.send({ embeds: [cero_embed] })

        const un_embed = new MessageEmbed()
            .setTitle(`<:netting_bien:858849790284791808> | Configuracion del Servidor ${message.guild.name}`)
            .addField("Canal de Nivel: ", (configGuild.rankchannel ? client.channels.cache.get(configGuild.rankchannel).toString() : "No ha sido Seleccionado"))
            .addField("Canal de Logs: ", (configGuild.logschannel ? client.channels.cache.get(configGuild.logschannel).toString() : "No ha sido Seleccionado"))
            .addField("Canal de Bienvenidas: ", (configGuild.welcomechannel ? client.channels.cache.get(configGuild.welcomechannel).toString() : "No ha sido Seleccionado"))
            .setColor("#00FF00")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()

        return message.channel.send({ embeds: [un_embed] })

    },
};