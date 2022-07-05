const { Message, Client, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;
const Eco = require('../../models/Eco');

module.exports = {
    name: "withdraw",
    aliases: ['wd'],
    description: "Comando para Sacar Dinero del Banco",
    usage: "[120/all]",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        const userfind = await Eco.findOne({ userid: message.author.id, guildid: message.guild.id })

        const cero_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡No tenemos registro del usuario en nuestra Base de Datos!`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()

        if (!userfind) return message.reply({ embeds: [cero_embed] })

        const un_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡Faltan argumentos! Use \`${prefix}withdraw [120/all]\``)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()

        if (!args[0]) return message.reply({ embeds: [un_embed] })

        let dos_embed = new MessageEmbed()
            .setTitle(`<:netting_bien:858849790284791808> | Sacaste tu Dinero`)
            .setDescription(`Sacaste todo tu Dinero del Banco, un Total de $${userfind.bank}`)
            .setColor("#00FF00")
            .setFooter (
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()

        let tres_embed = new MessageEmbed()
            .setTitle(`<:netting_bien:858849790284791808> | Sacaste tu Dinero`)
            .setDescription(`Sacaste tu Dinero del Banco, un Total de $${parseInt(args[0])}`)
            .setColor("#00FF00")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        const cuatro_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¿¡Falta de Dinero!? Use \`${prefix}withdraw [120/all]\``)
            .setDescription(`Es posible que lo que intente sacar del Banco Dinero que no tiene`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()

        if (args[0] === "all") {
            let getAM = userfind.money + userfind.bank

            await Eco.findByIdAndUpdate(userfind._id, {
                money: getAM,
                bank: 0
            })

            return message.reply({ embeds: [dos_embed] })
        } else if (parseInt(args[0]) < userfind.bank) {

            await Eco.findByIdAndUpdate(userfind._id, {
                money: userfind.money + parseInt(args[0]),
                bank: userfind.bank - parseInt(args[0])
            })

            return message.reply({ embeds: [tres_embed] })
        } else {
            return message.reply({ embeds: [cuatro_embed] })
        }

    },
};
