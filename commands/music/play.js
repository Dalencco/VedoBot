const { Message, Client, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;

module.exports = {
    name: "play",
    aliases: ['p'],
    description: "Comando para escuchar Musica",
    usage: "[Musica/URL]",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        const { member, guild, channel } = message;
        const VCM = member.voice.channel;

        const cero_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡Faltan argumentos! Use \`${prefix}play [Musica/URL]\` o asegurece de Escribir Bien`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (args.length < 1) return message.reply({ embeds: [cero_embed] });

        let un_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡Debes estar en un Canal!`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (!VCM) return message.reply({ embeds: [un_embed] });

        let dos_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡Debemos estar en el Mismo Canal!`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (guild.me.voice.channelId && VCM.id !== guild.me.voice.channelId) return message.reply({ embeds: [dos_embed] });

        try {

            let tres_embed = new MessageEmbed()
                .setTitle(`<:netting_bien:858849790284791808> | Por favor, espere un momento...`)
                .setColor("#00FF00")
                .setFooter(
                    `Requerido por ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
                .setTimestamp()

            client.distube.playVoiceChannel(VCM, args.join(" "), { message, textChannel: channel, member: member });
            return message.reply({ embeds: [tres_embed] });

        }

        catch (e) {
            const embed = new MessageEmbed()
                .setTitle('An error ocurred!')
                .setDescription(`Contact with my Developer: Kento`)
                .setColor("RED")
                .setFooter(
                    `Requerido por ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
                .setTimestamp()

            message.channel.send({ embeds: [embed] });
        }

    },
};
