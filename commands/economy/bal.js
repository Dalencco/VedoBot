const { Message, Client, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;
const Eco = require('../../models/Eco');

module.exports = {
    name: "bal",
    aliases: ['balance'],
    description: "Comando para ver el dinero total",
    cooldown: 1000 * 10,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(message.author.id)

        const un_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | El usuario no existe, asegurece de mencionarlo`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        const dos_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡No tenemos registro del usuario en nuestra Base de Datos!`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (!Member) return message.reply({ embeds: [un_embed] })

        const userfind = await Eco.findOne({ userid: Member.id, guildid: message.guild.id })

        if (!userfind) return message.channel.send({ embeds: [dos_embed] })

        const tres_embed = new MessageEmbed()
            .setTitle(`Balance de ${Member.user.tag}`)
            .setColor((Member.displayHexColor === "#000000" ? "RANDOM" : Member.displayHexColor))
            .addField('**__Dinero__**:', `$${userfind.money}`)
            .addField('**__Banco__**:', `$${userfind.bank}`)
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        return message.reply({ embeds: [tres_embed] })

    },
};