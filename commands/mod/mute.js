const { Message, Client, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;
const ms = require('ms')

module.exports = {
    name: "mute",
    aliases: ['mt'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        let dos_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡Usted no cuenta con los permisos suficientes para ejecutar este comando! Requiere de: \`MANAGE_MESSAGES\``)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply({ embeds: [dos_embed] })
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const um_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡Faltan argumentos! Use \`${prefix}mute @user\` o asegurece que el usuario exista`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (!Member) return message.reply({ embeds: [um_embed] })
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        let tres_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | El rol \`Muted\` no se ha encontrado, espere un momento a que lo cree y configure`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        let cuatro_embed = new MessageEmbed()
            .setTitle(`<:netting_bien:858849790284791808> | El rol \`Muted\` ha sido creado y configurado correctamente`)
            .setColor("#00FF00")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (!role) {
            try {
                message.reply({ embeds: [tres_embed] })

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.reply({ embeds: [cuatro_embed] })
            } catch (error) {
                console.log(error)
            }
        };
        let cinco_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | \`${Member.displayName}\` ya ha sido muteado`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        let seis_embed = new MessageEmbed()
            .setTitle(`<:netting_bien:858849790284791808> | \`${Member.displayName}\` ahora esta muteado`)
            .setColor("#00FF00")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()
        
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if (Member.roles.cache.has(role2.id)) return message.reply({ embeds: [cinco_embed] })
        await Member.roles.add(role2)
        message.reply({ embeds: [seis_embed] })

    },
};
