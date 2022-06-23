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

        const userfind = await Eco.findOne({ userid: message.author.id, guildid: message.guild.id })

        var m = Math.floor(Math.random() * 500)
        let jobs = ["Programador", "Arquitecto", "Freelancer", "Pruebas", "QA", "Probador", "Vendedor", "Estafador", "Tecnico"]
        let getJob = jobs[Math.floor(Math.random() * 8)]

        let un_embed = new MessageEmbed()
                .setTitle(`<:netting_bien:858849790284791808> | Buen Trabajo`)
                .setDescription(`Trabajaste de ${getJob} y ganaste $${m}`)
                .setColor("#00FF00")
                .setFooter(
                    `Requerido por ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
                .setTimestamp()

        if (!userfind) {
            const newEconomyUser = new Eco({
                guildid: message.guild.id,
                userid: message.author.id,
                money: m,
                bank: 0
            })

            await newEconomyUser.save()

            return message.reply({ embeds: [un_embed] })
        }

        let my = userfind.money + m

        await Eco.findByIdAndUpdate(userfind._id, {
            money: my
        })

        return message.reply({ embeds: [un_embed] })

    },
};
