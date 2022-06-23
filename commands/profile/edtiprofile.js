const { Message, Client, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;
const Profile = require('../../models/Profile');

module.exports = {
    name: "editprofile",
    aliases: ['edpf'],
    description: "Comando para Editar tu Perfil",
    usage: "[1(URL)/2(Texto)/3(1-3)] [Contenido]",
    cooldown: 1000 * 30,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        const Member = message.guild.members.cache.get(message.author.id);

        const userfind = await Profile.findOne({ userid: Member.id, guildid: message.guild.id })

        const cero_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡No tenemos registro del usuario en nuestra Base de Datos!`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (!userfind) return message.reply({ embeds: [cero_embed] })

        const dos_embed = new MessageEmbed()
            .setTitle(`<:netting_bien:858849790284791808> | Tu perfil se actualizo correctamente`)
            .setColor("#00FF00")
            .setDescription(`¡Actualizaste tu Fondo!`)
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()

        const tres_embed = new MessageEmbed()
            .setTitle(`<:netting_bien:858849790284791808> | Tu perfil se actualizo correctamente`)
            .setColor("#00FF00")
            .setDescription(`¡Actualizaste tu Descripcion!`)
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()

        const um_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡Faltan argumentos! Use \`${prefix}editprofile [1(URL)/2(Texto)/3(1-3)] [Contenido]\``)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        const cuatro_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡Muchas Palabras! Asegurece de no utilizar mas de \`13\` Palabras para su Descripcion o no tan largas`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()

        const cinco_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡Que numero es ese! Asegurece de no utilizar mas de \`3\` Para su color de Bar`)
            .setDescription(`Y recuerde que: `)
            .addField("1: ", "Azul")
            .addField("2: ", "Rojo")
            .addField("3: ", "Verde")
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()

        const seis_embed = new MessageEmbed()
            .setTitle(`<:netting_bien:858849790284791808> | Tu perfil se actualizo correctamente`)
            .setColor("#00FF00")
            .setDescription(`¡Actualizaste tu Color de Bar!`)
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()

        if (args[0] === undefined || args[1] === undefined) return message.channel.send({ embeds: [um_embed] })

        if (args[0] === "1") {
            await Profile.findByIdAndUpdate(userfind._id, {
                bg: args.slice(1, args.length).join(" ")
            })

            return message.channel.send({ embeds: [dos_embed] })
        } else if (args[0] === "2" && args.slice(1, args.length).length < 13) {
            for (let index = 1; index < args.length; index++) {
                const e = args[index];
                if (e.length > 10) {
                    return message.reply({ embeds: [cuatro_embed] })
                }
            }

            await Profile.findByIdAndUpdate(userfind._id, {
                description: args.slice(1, args.length).join(" ")
            })

            return message.channel.send({ embeds: [tres_embed] })
        } else if (args[0] === "3") {
            if (parseInt(args[1]) < 4) {
                await Profile.findByIdAndUpdate(userfind._id, {
                    colorran: parseInt(args[1])
                })

                return message.reply({ embeds: [seis_embed] })
            } else {
                return message.reply({ embeds: [cinco_embed] })
            }
        } else {
            return message.reply({ embeds: [cuatro_embed] })
        }

    },
};
