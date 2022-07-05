const { Message, Client, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;
const Eco = require('../../models/Eco');

module.exports = {
    name: "rob",
    description: "Comando para intentar Robarle Dinero a Alguien mas",
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

        if (!Member || Member.bot) return message.reply({ embeds: [un_embed] })

        const userfind = await Eco.findOne({ userid: Member.id, guildid: message.guild.id })
        const uf = await Eco.findOne({ userid: message.author.id, guildid: message.guild.id })

        if (!uf || !userfind) return message.channel.send({ embeds: [dos_embed] })

        var poss = [0, 1, 2]

        var p = poss[Math.floor(Math.random() * 2)]
            
        console.log(p)

        let f = []

        if (p === 0 && userfind.money > 0) {
            let rn = Math.floor((userfind.money * Math.floor(Math.random() * 100)) / 100)

            let m = userfind.money - rn
            let ma = uf.money + rn

            const tres_embed = new MessageEmbed()
                .setTitle(`<:netting_bien:858849790284791808> | Le robaste Dinero a ${Member.user.tag}`)
                .setDescription(`El robaste $${rn}`)
                .setColor("#00FF00")
                .setFooter(
                    `Requerido por ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setTimestamp()

            await Eco.findByIdAndUpdate(userfind._id, {
                money: m
            })

            await Eco.findByIdAndUpdate(uf._id, {
                money: ma
            })

            return message.reply({ embeds: [tres_embed] })
        } else if (p === 1 && uf.money > 0) {
            let rn = Math.floor((uf.money * Math.floor(Math.random() * 100)) / 100)

            let m = userfind.money + rn
            let ma = uf.money - rn

            const cuatro_embed = new MessageEmbed()
                .setTitle(`<:netting_bien:858849790284791808> | Intentaste Robarle Dinero a ${Member.user.tag}`)
                .setDescription(`Intentaste robarle y no pudiste, por lo que perdiste $${rn}`)
                .setColor("#00FF00")
                .setFooter(
                    `Requerido por ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setTimestamp()

            await Eco.findByIdAndUpdate(userfind._id, {
                money: m
            })

            await Eco.findByIdAndUpdate(uf._id, {
                money: ma
            })

            return message.reply({ embeds: [cuatro_embed] })
        } else if (p === 2) {
            const cinco_embed = new MessageEmbed()
                .setTitle(`<:netting_bien:858849790284791808> | Intentaste Robarle Dinero a ${Member.user.tag}`)
                .setDescription(`Pero no pudiste Robarle nada`)
                .setColor("#00FF00")
                .setFooter(
                    `Requerido por ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setTimestamp()

            return message.reply({ embeds: [cinco_embed] })
        } else {
            const seis_embed = new MessageEmbed()
                .setTitle(`<:netting_bien:858849790284791808> | Intentaste Robarle Dinero a ${Member.user.tag}`)
                .setDescription(`Pero al parecer ninguno de los dos tuvo Dinero`)
                .setColor("#00FF00")
                .setFooter(
                    `Requerido por ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setTimestamp()

            return message.reply({ embeds: [seis_embed] })
        }

    },
};