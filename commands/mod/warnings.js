const { Message, Client, MessageEmbed } = require("discord.js");
const prefix = require('../../config.json').prefix;
const Warns = require("../../models/Warns");

module.exports = {
    name: "warnings",
    aliases: ['wns'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        let dos_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡Usted no cuenta con los permisos suficientes para ejecutar este comando! Requiere de: \`BAN_MEMBERS\``)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()
            
        if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply({ embeds: [dos_embed] })
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const um_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡Faltan argumentos! Use \`${prefix}warnings @user\` o asegurece que el usuario exista`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()

        if (!Member) return message.reply({ embeds: [um_embed] })

        const warnings = await Warns.find({ userid: Member.id });

        const tres_embed = new MessageEmbed()
            .setTitle(`<:netting_bien:858849790284791808> | ¡WOW! El usuario \`${Member.displayName}\` No Posee Advertencias en este momento`)
            .setColor("#00FF00")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (warnings <= 0) return message.reply({ embeds: [tres_embed] }); 

        const cuatro_embed = new MessageEmbed()
                .setTitle(`Warnings de \`${Member.displayName}\` | ${warnings.length} Advertencia(s)`)
                .setDescription(`${warnings.map((warn) => `\nID: **${warn._id}**\nRazon: ${warn.warnmsg}\nPor: \`${client.users.cache.find(user => user.id === warn.modid).tag}\`\nIDv2: *${warn.warnid}*`).join('\n--------------------------------------------------')}`)
                .setColor("#C00F0F")
                .setFooter("Nota: En caso de que IDv1 No funcione al Eliminar Una Advertencia, puede usar IDv2")

        return message.reply({ embeds: [cuatro_embed] });

    },
};