const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "reply",
    aliases: ['r'],
    description: "Comando para devolver un mensaje a un Usuario",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        let dos_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡Usted no es parte del grupo de desarrolladores o staffs para poder ejecutar este comando!`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (message.author.id !== "724180324397088860") return message.reply({ embeds: [dos_embed] })

        const Member = client.users.cache.get(args[0])

        let tres_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | No he encontrado al Usuario`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()

        if (!Member) return message.reply({ embeds: [tres_embed] })

        Member.send(args.slice(1, args.length).join(" "))

        let un_embed = new MessageEmbed()
                .setTitle(`<:netting_bien:858849790284791808> | Mensaje enviado a ${Member.tag}`)
                .setDescription(`Contenido: \n${args.slice(1, args.length).join(" ")}`)
                .setColor("#00FF00")
                .setFooter(
                    `Requerido por ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
                .setTimestamp()

        return message.reply({ embeds: [un_embed] })

    },
};
