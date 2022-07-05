const { Message, Client, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;
const Eco = require('../../models/Eco');

module.exports = {
    name: "ecotop",
    aliases: ['topeco'],
    description: "Comando ver el Top en Economia",
    cooldown: 1000 * 10,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        const ecoTops = await Eco.find({ guildid: message.guild.id }).sort([["money", "descending"]]).limit(10)

        const un_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡No tenemos registro del usuario en nuestra Base de Datos!`)
            .setColor("FF0000")
            .setDescription(`Al parecer nadie juega al Dinero en ${message.guild.name} :(`)
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (!ecoTops) return message.reply({ embeds: [un_embed] })

        const embed_tops = new MessageEmbed()
            .setTitle(`<:netting_bien:858849790284791808> | Leaderboard de: ${message.guild.name} En economia`)
            .setDescription(`${ecoTops.map((user, index) => `${index + 1}. **${client.users.cache.get(user.userid).tag}** - $${user.money}/$${user.bank}`).join("\n")}`)
            .setColor("#00FF00")
                .setFooter(
                    `Requerido por ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
            .setTimestamp()

        return message.reply({ embeds: [embed_tops] })

    },
};