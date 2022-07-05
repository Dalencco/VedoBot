const { Message, Client, MessageEmbed, MessageAttachment } = require("discord.js");
const prefix = require("../../config.json").prefix;
const { createCanvas, loadImage, registerFont } = require('canvas');
const Rank = require('../../models/Rank');
const { roundRect } = require('../../lib/helpers');

module.exports = {
    name: "rank",
    aliases: ['lvl', 'nivel', 'nvl'],
    description: "Comando de Niveles",
    cooldown: 1000 * 10,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(message.author.id);

        const userfind = await Rank.findOne({ userid: Member.id, guildid: message.guild.id })

        const cero_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡No tenemos registro del usuario en nuestra Base de Datos!`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (!userfind) return message.reply({ embeds: [cero_embed] })

        let dos_embed = new MessageEmbed()
            .setTitle(`<:netting_bien:858849790284791808> | Nivel de ${Member.username}`)
            .addField('Nivel:', `${userfind.level}`)
            .addField('XP:', `${userfind.xp}/${userfind.xpreq}`)
            .setColor("#00FF00")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        // return message.reply({ embeds: [dos_embed] })

        const canvas = createCanvas(400, 150)
        const ctx = canvas.getContext('2d')
        const bg = await loadImage("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmovementmindfulnessandme.com%2Fwp-content%2Fuploads%2F2020%2F12%2Fgradient-background-02.jpg&f=1&nofb=1")

        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

        registerFont('./fonts/VictorMono-Bold.ttf', { family: 'VictorMono' })

        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        ctx.fillRect(10, 10, 380, 130)

        const userRank = (await Rank.find({ guildid: message.guild.id }).sort([["xp", "descending"]])).findIndex(du => du.userid === userfind.userid) + 1
        const canvasAvatar = createCanvas(95, 95)
        const ctxav = canvasAvatar.getContext('2d')
        const av = await loadImage(Member.displayAvatarURL({ format: 'png', 'dynamic': false }))
        ctxav.beginPath()
        ctxav.arc(95/2, 95/2, 95/2, 0, Math.PI * 2, true)
        ctxav.clip()
        ctxav.drawImage(av, 0, 0, 95, 95)
        ctxav.strokeStyle = "#000"

        ctx.drawImage(canvasAvatar, 20, 25, 95, 95)

        // ctx.fillText(text, x, y, max-width)

        let e = userfind.xp
        let exp = `${(userfind.xp > 999 ? (userfind.xp/1000).toFixed(1).replace(".0", "") + "k" : userfind.xp)}/${(userfind.xpreq > 999 ? (userfind.xpreq/1000).toFixed(1).replace(".0", "") + "k" : userfind.xpreq)} XP`

        ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
        roundRect(ctx, 115, 90, 265, 13, 8, true, false)
                
        const grd = ctx.createLinearGradient(0, 0, 365, 0)
        grd.addColorStop(0, "rgba(0, 202, 204, 0.9)")
        grd.addColorStop(1, "rgba(153, 204, 255, 0.9)")
        ctx.fillStyle = grd
        // roundRect(c, x, y, w, h, r, f)
        roundRect(ctx, 115, 90, (e * 265) / userfind.xpreq, 13, 8, true, false)

        ctx.font = "11pt VictorMono"
        ctx.fillStyle = "white"
        ctx.fillText(`Top #${userRank}`, 330, 30, 380)

        let wi
         if (userfind.level > 99 || userfind.level < -99) {
            wi = 290
        } else if (userfind.level > 9 || userfind.level < -9) {
            wi = 310
        } else {
            wi = 320
        }

        ctx.font = "11pt VictorMono"
        ctx.fillStyle = "white"
        ctx.fillText(`Nivel ${userfind.level}`, wi, 130, 380)

        let fsi = 13
        if (ctx.measureText(`${Member.user.username}#${Member.user.discriminator}`).width >= 140) {
            fsi = 10
        }

        ctx.font = `${fsi}pt VictorMono`
        ctx.fillStyle = "rgb(0, 202, 204)"
        ctx.fillText(`${Member.user.username}#${Member.user.discriminator}`, 120, 80, 160)

        ctx.font = "9pt VictorMono"
        ctx.textAlign = "right"
        ctx.fillStyle = "#fff"
        let x
        if (userfind.xp > 999 || userfind.xpreq > 999) {
            x = 373
        } else {
            x = 380
        }
        ctx.fillText(exp, x, 80, 380)

        // Canvas By Kento

        const ri = new MessageAttachment(canvas.toBuffer(), 'rank.png')
        return message.reply({ files: [ri] })

    },
};
