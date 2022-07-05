const { Message, Client, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;
const Config = require('../../models/Config');

module.exports = {
    name: "rankchannel",
    aliases: ['setrank', 'setrankchannel'],
    description: "Comando para Configurar el Canal de Niveles",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        let un_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡Usted no cuenta con los permisos suficientes para ejecutar este comando! Requiere de: \`ADMIN\``)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({ embeds: [un_embed] })

        const channel = message.mentions.channels.first() || client.channels.cache.get(args[0]) || message.channel

        const configGuild = await Config.findOne({ guildid: message.guild.id })

        if (!configGuild) {
            const newConfigGuild = new Config({
                guildid: message.guild.id,
                rankchannel: channel.id
            })

            await newConfigGuild.save()

            let dos_embed = new MessageEmbed()
                .setTitle(`<:netting_bien:858849790284791808> | Canal de Niveles Seleccionado`)
                .setDescription(`${channel.toString()} Ahora es el canal de Niveles`)
                .setColor("#00FF00")
                .setFooter(
                    `Requerido por ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setTimestamp()

            return message.reply({ embeds: [dos_embed] })
        }

        let tres_embed = new MessageEmbed()
                .setTitle(`<:netting_bien:858849790284791808> | Se actualizo el Canal de Niveles`)
                .setDescription(`${channel.toString()} Ahora es el canal de Niveles`)
                .setColor("#00FF00")
                .setFooter(
                    `Requerido por ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setTimestamp()

        await Config.findByIdAndUpdate(configGuild._id, {
            rankchannel: channel.id
        })

        return message.reply({ embeds: [tres_embed] })

    },
};