const { Message, Client, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;
const Eco = require('../../models/Eco');

module.exports = {
    name: "work",
    aliases: ['job'],
    description: "Comando para trabajar y conseguir Dinero",
    cooldown: 60000 * 360,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const un_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | El usuario no existe, asegurece de mencionarlo o que no sea un Bot`)
            .setColor("FF000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        const dos_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡No tenemos registro del usuario en nuestra Base de Datos!`)
            .setColor("FF000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (!Member || Member.bot) return message.reply({ embeds: [un_embed] })

        const userfind = await Eco.findOne({ userid: Member.id, guildid: message.guild.id })
        const uf = await Eco.findOne({ userid: message.author.id, guildid: message.guild.id })

        if (!uf || !userfind) return message.channel.send({ embeds: [dos_embed] })

        const poss = [0, 1, 2]

        let p = Math.floor(Math.random * 2)

        if (poss[p] === 1 && userfind.money > 0) {
            let rn = Math.floor(Math.random * 1000)

            let m = userfind.money - rn

            await Eco.findByIdAndUpdate(userfind._id, {
                money: m
            })

            await Eco.findByIdAndUpdate()
        }

    },
};