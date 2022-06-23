const { Message, Client, MessageEmbed, MessageAttachment } = require("discord.js");
const { roundRect, wrapText } = require('../../lib/helpers');
const { createCanvas, loadImage, registerFont } = require('canvas');
const Profile = require("../../models/Profile");
const Rank = require('../../models/Rank');

module.exports = {
    name: "profile",
    aliases: ['pf', 'perfil'],
    description: "Comando para ver tu Perfil",
    cooldown: 1000 * 10,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(message.author.id);

        const userfind = await Profile.findOne({ userid: Member.id, guildid: message.guild.id })
        const u = await Rank.findOne({ userid: Member.id, guildid: message.guild.id })

        const cero_embed = new MessageEmbed()
            .setTitle(`<:netting_mal:858849837982416896> | ¡No tenemos registro del usuario en nuestra Base de Datos!`)
            .setColor("FF0000")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        if (!userfind) return message.reply({ embeds: [cero_embed] })

        // createCanvas(w, h)
        const canvas = createCanvas(600, 400)
        const ctx = canvas.getContext('2d')
        const bg = await loadImage(userfind.bg)

        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

        registerFont('./fonts/VictorMono-Bold.ttf', { family: 'VictorMono' })

        const canvasAvatar = createCanvas(120, 120)
        const ctxav = canvasAvatar.getContext('2d')
        const av = await loadImage(Member.displayAvatarURL({ format: 'png', 'dynamic': false }))
        ctxav.drawImage(av, 0, 0, 120, 120)

        ctx.fillStyle = "rgba(75, 0, 130, 0.7)"
        roundRect(ctx, 20, 70, 560, 130, 10, true, false)

        ctx.fillStyle = "rgba(255, 255, 255,0.8)"
        ctx.fillRect(45, 15, 130, 130)

        // ctx.drawImage(x, y)
        ctx.drawImage(canvasAvatar, 50, 20, 120, 120)

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.fillRect(20, 240, 560, 140)

        ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
        ctx.fillRect(460, 250, 2, 120)

        ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
        // ctx.fillRect(x, y, w, h)
        ctx.fillRect(30, 320, 420, 2)

        ctx.font = "17pt VictorMono"
        ctx.fillStyle = "gray"
        const t = wrapText(ctx, (userfind.description === "" ? "Sin Descripcion" : userfind.description), 30, 270, 420, 35)
        t.forEach(function(item) {
            ctx.fillText(item[0], item[1], item[2]); 
        })

        ctx.font = "17pt VictorMono"
        ctx.fillStyle = "gray"
        ctx.fillText(`Insignias: `, 30, 360, 420)

        if (userfind.insigneas.length > 0) {
            var d = 410

            for (let index = 0; index < userfind.insigneas.length; index++) {

                if (userfind.insigneas[index] === "vedo") {
                    let i = await loadImage("./img/logo.png")

                    ctx.drawImage(i, d, 325, 50, 50)

                    d = d - 40
                }
                
                if (userfind.insigneas[index] === "dev") {
                    let i = await loadImage("./img/dev.png")

                    ctx.drawImage(i, d, 325, 50, 50)

                    d = d - 40
                }
                
            }
        }

        ctx.font = "20pt VictorMono"
        ctx.fillStyle = "white"
        ctx.fillText(`${Member.user.username}#${Member.user.discriminator}`, 190, 110, 220)

        let wi
        let hi = 110
        let fi = 20
        if (u.level > 999 || u.level < -999 || u.level < -9999) {
            fi = 16
            hi = 105
            wi = 440
        } else if (u.level > 99 || u.level < -99) {
            wi = 430
        } else {
            wi = 460
        }

        ctx.font = `${fi}pt VictorMono`
        ctx.fillStyle = "white"
        ctx.fillText(`Nivel ${u.level}`, wi, hi, 480)

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        roundRect(ctx, 21, 185, 559, 15, { bl: 5, br: 5 }, true, false)

        var c = "orange"
        if (userfind.colorran) {
            if (userfind.colorran === 1) {
                c = "rgb(51, 51, 255)"
            } else if (userfind.colorran === 2) {
                c = "rgb(255, 0, 0)"
            } else {
                c = "rgb(0, 255, 0)"
            }
        }

        ctx.fillStyle = c
        roundRect(ctx, 21, 185, (u.xp * 560) / u.xpreq, 15, { bl: 5, br: (u.xp === u.xpreq ? 5 : 0) }, true, false)

        if (userfind.rep > 0) {
            ctx.font = "20pt VictorMono"
            ctx.fillStyle = "white"
            ctx.fillText(`+${userfind.rep} Rep`, 70, 175, 300)
        }

        ctx.font = "17pt VictorMono"
        ctx.fillStyle = "white"
        let x
        if (u.xp > 999 || u.xpreq > 999) {
            x = 420
        } else if (u.xp > 99 || u.xpreq > 99) {
            x = 450
        } else {
            x = 480
        }
        ctx.fillText(`${(u.xp > 999 ? (u.xp/1000).toFixed(1).replace(".0", "") + "k" : u.xp)}/${(u.xpreq > 999 ? (u.xpreq/1000).toFixed(1).replace(".0", "") + "k" : u.xpreq)} XP`, x, 170, 440)

        // Canvas By Kento

        const ri = new MessageAttachment(canvas.toBuffer(), 'profile.png')
        return message.channel.send({ files: [ri] })

    },
};
