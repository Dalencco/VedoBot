const { Message, Client, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;
const Warns = require("../../models/Warns");

module.exports = {
    name: "delwarn",
    aliases: ['deletewarn'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        let dos_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡Usted no cuenta con los permisos suficientes para ejecutar este comando! Requiere de: \`BAN_MEMBERS\``)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply({ embeds: [dos_embed] })
        const WarnID = args[0];
        const um_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡Faltan argumentos! Use \`${prefix}delwarn [WarnID]\` o asegurece que la ID exista Realmente`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (!WarnID) return message.reply({ embeds: [um_embed] });

        try {
            const warnv1 = await Warns.findOne({ _id: WarnID });

            let cuatro_embed = new MessageEmbed()
                .setTitle(`<:netting_bien:858849790284791808> | Se le elimino Una Advertencia al Usuario: \`${message.guild.members.cache.get(warnv1.userid).displayName}\`\n Por: \`${message.member.displayName}\``)
                .setColor("#00FF00")
                .setFooter(
                    `Requerido por ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
                .setTimestamp()

            await Warns.findOneAndDelete({ _id: WarnID });

            return message.reply({ embeds: [cuatro_embed] });
        } 
        
        catch {
            
            try {
                warnv2 = await Warns.findOne({ warnid: WarnID });

                let cuatro_embed = new MessageEmbed()
                    .setTitle(`<:netting_bien:858849790284791808> | Se le elimino Una Advertencia al Usuario: \`${message.guild.members.cache.get(warnv2.userid).displayName}\`\n Por: \`${message.member.displayName}\``)
                    .setColor("#00FF00")
                    .setFooter(
                        `Requerido por ${message.author.tag}`,
                        message.author.displayAvatarURL({ dynamic: true })
                      )
                    .setTimestamp()

                await Warns.findOneAndDelete({ warnid: WarnID });

                return message.reply({ embeds: [cuatro_embed] });
            } 
            
            catch {
                const tres_embed = new MessageEmbed()
                    .setTitle(`<:netting_mal:858849837982416896> | ¡Al parecer la ID no es valida de ningun tipo (v1 o v2) o asegurece de Escribirla Bien!`)
                    .setColor("FF0000")
                    .setFooter(
                        `Requerido por ${message.author.tag}`,
                        message.author.displayAvatarURL({ dynamic: true })
                      )
                    .setTimestamp()
                
                return message.reply({ embeds: [tres_embed] })
            }
        }

    },
};
