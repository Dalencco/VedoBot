const { Message, Client, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;
const Rank = require('../../models/Rank');

module.exports = {
    name: "leveltop",
    aliases: ['leaderboardlevel', 'ldlvl'],
    description: "Comando para ver un Top de Niveles",
    cooldown: 1000 * 5,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        const top = await Rank.find({ guildid: message.guild.id }).sort([["xp", "descending"]]).limit(10)

        const uno_embed = new MessageEmbed()
        .setTitle(`<:netting_bien:858849790284791808> | Leaderboard de: ${message.guild.name} En niveles`)
        .setDescription(`${top.map((user, index) => `${index + 1} - **${message.guild.members.cache.get(user.userid).user.username}**. ${user.level} LVL & ${user.xp} XP`).join('\n')}`)
        .setColor("#00FF00")
        .setFooter(
            `Requerido por ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
        .setTimestamp()

        return message.channel.send({ embeds: [uno_embed] })

    },
};
