const { Message, Client, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;
const Profile = require('../../models/Profile');

module.exports = {
    name: "rep",
    aliases: ['reputacion'],
    cooldown: 60000 * 360,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const um_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡Faltan argumentos! Use \`${prefix}rep @user\`, asegurece que el usuario exista o que no seas tu`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (!Member || Member.id === message.author.id) return message.reply({ embeds: [um_embed] })

        const userfind = await Profile.findOne({ userid: Member.id, guildid: message.guild.id })

        if (!userfind) {
            const tres_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡No tenemos registro del usuario en nuestra Base de Datos!`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

            return message.channel.send({ embeds: [tres_embed] })
        }

        let repu = userfind.rep + 1

        await Profile.findByIdAndUpdate(userfind._id, {
            rep: repu
        })

        const dos_embed = new MessageEmbed()
            .setTitle(`<:netting_bien:858849790284791808> | ¡Reputacion dada!`)
            .setDescription(`Se le asigno correctamente un punto de reputacion a \`${Member.user.username}#${Member.user.discriminator}\``)
            .setColor("#00FF00")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()

        return message.channel.send({ embeds: [dos_embed] })

    },
};
