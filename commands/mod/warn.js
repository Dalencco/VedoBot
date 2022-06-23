const { Message, Client, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;
const Warns = require("../../models/Warns");
const { v4 } = require("uuid");

module.exports = {
    name: "warn",
    aliases: ['w'],
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
            .setTitle(`<:netting_mal:858849837982416896> | ¡Faltan argumentos! Use \`${prefix}warn @user [razon]\` o asegurece que el usuario exista`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (!Member) return message.reply({ embeds: [um_embed] })

        const Razon = args.slice(1, args.length).join(" ");

        const tres_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡Faltan argumentos! Use \`${prefix}warn @user [razon]\` o asegurece que el usuario exista`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (!Razon) return message.reply({ embeds: [tres_embed] })

        const userid = Member.id;
        const modid = message.member.id;
        const warnid = v4();

        const newWarn = new Warns({
            warnid,
            userid,
            modid,
            warnmsg: Razon
        })
        
        await newWarn.save();

        let cuatro_embed = new MessageEmbed()
            .setTitle(`<:netting_bien:858849790284791808> | \`${Member.displayName}\` Ha sido Advertido por: \`${message.member.displayName}\`, con la Razon: **${Razon}**`)
            .setColor("#00FF00")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        return message.reply({ embeds: [cuatro_embed] });

    },
};
