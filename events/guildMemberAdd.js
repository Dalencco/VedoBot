const client = require('../index');
const { MessageAttachment, Client, Message } = require('discord.js');
const { createCanvas, loadImage, registerFont } = require('canvas');
const { roundRect } = require('../lib/helpers');
const Config = require('../models/Config');

client.on("guildMemberAdd", async (user) => {

    const configGuild = await Config.findOne({ guildid: user.guild.id })

    if (!configGuild || !configGuild.welcomechannel) return;

    const canvas = createCanvas(400, 200)
    const ctx = canvas.getContext('2d')

    const bg = await loadImage("https://cdn.discordapp.com/attachments/753459740335538272/988545444730781766/e69fe958ef96a0212d1d4472abedfd97.jpg")

    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    registerFont('./fonts/VictorMono-Bold.ttf', { family: 'VictorMono' })

    ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
    roundRect(ctx, 10, 10, 380, 180, 5, true, false)

    const canvasAvatar = createCanvas(100, 100)
    const ctxav = canvasAvatar.getContext('2d')
    const av = await loadImage(user.displayAvatarURL({ format: 'png', 'dynamic': false }))
    ctxav.beginPath()
    ctxav.arc(100/2, 100/2, 100/2, 0, Math.PI * 2, true)
    ctxav.clip()
    ctxav.drawImage(av, 0, 0, 100, 100)

    ctx.drawImage(canvasAvatar, 250, 25, 100, 100)

    ctx.font = "35pt VictorMono"
    ctx.fillStyle = "black"
    ctx.fillText(`Bienvenido`, 30, 70, 200)

    ctx.font = "20pt VictorMono"
    ctx.fillStyle = "black"
    ctx.fillText(user.user.tag, 40, 110, 370)

    ctx.font = "15pt VictorMono"
    ctx.fillStyle = "black"
    ctx.fillText(`Bienvenid@ a ${user.guild.name}, Usuario #${user.guild.memberCount}`, 15, 150, 370)

    const ri = new MessageAttachment(canvas.toBuffer(), "welcome.png")

    client.channels.cache.get(configGuild.welcomechannel).send({ files: [ri], content: `Bienvenid@ ${user.user.toString()} Al server de ${user.guild.name}! Tu eres el miembro #${user.guild.memberCount}, Asegurate de leerte las reglas y demas para evitar posibles sanciones dentro del Server` })

})