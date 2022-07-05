const { Message, Client, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;
const Config = require('../../models/Config');

module.exports = {
    name: "welcomechannel",
    aliases: ['setwlc', 'setwelcomechannel'],
    description: "Comando para Configurar el Canal de Bienvenida",
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
                welcomechannel: channel.id
            })

            await newConfigGuild.save()

            let dos_embed = new MessageEmbed()
                .setTitle(`<:netting_bien:858849790284791808> | Canal de Bienvenidas Seleccionado`)
                .setDescription(`${channel.toString()} Ahora es el canal de Bienvenidas`)
                .setColor("#00FF00")
                .setFooter(
                    `Requerido por ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setTimestamp()

            return message.reply({ embeds: [dos_embed] })
        }

        let tres_embed = new MessageEmbed()
                .setTitle(`<:netting_bien:858849790284791808> | Se actualizo el Canal de Bienvenidas`)
                .setDescription(`${channel.toString()} Ahora es el canal de Bienvenidas`)
                .setColor("#00FF00")
                .setFooter(
                    `Requerido por ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setTimestamp()

        await Config.findByIdAndUpdate(configGuild._id, {
            welcomechannel: channel.id
        })

        return message.reply({ embeds: [tres_embed] })

    },
};