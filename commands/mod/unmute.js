const { Message, Client, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;

module.exports = {
    name: "unmute",
    aliases: ['umt'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        let un_embed = new MessageEmbed()
        .setTitle(`<:netting_mal:858849837982416896> | ¡Faltan argumentos! Use \`${prefix}mute @user\` o asegurece que el usuario exista`)
        .setColor("FF0000");
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send({ embeds: [un_embed] })

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        let dos_embed = new MessageEmbed()
        .setTitle(`<:netting_bien:858849790284791808> | \`${Member.displayName}\` ahora esta desmuteado`)
        .setColor("#00FF00")
        message.channel.send({ embeds: [dos_embed] })

    },
};