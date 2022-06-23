const { Message, Client, MessageEmbed, MessageAttachment } = require("discord.js");
const prefix = require("../../config.json").prefix;
const { createCanvas, loadImage, registerFont } = require('canvas');
const { roundRect } = require('../../lib/helpers');

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        const canvas = createCanvas(400, 200)
        const ctx = canvas.getContext('2d')

        const bg = await loadImage("https://cdn.discordapp.com/attachments/753459740335538272/988545444730781766/e69fe958ef96a0212d1d4472abedfd97.jpg")

        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

        registerFont('./fonts/VictorMono-Bold.ttf', { family: 'VictorMono' })

        ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
        roundRect(ctx, 10, 10, 380, 180, 5, true, false)

        const canvasAvatar = createCanvas(100, 100)
        const ctxav = canvasAvatar.getContext('2d')
        const av = await loadImage(message.author.displayAvatarURL({ format: 'png', 'dynamic': false }))
        ctxav.beginPath()
        ctxav.arc(100/2, 100/2, 100/2, 0, Math.PI * 2, true)
        ctxav.clip()
        ctxav.drawImage(av, 0, 0, 100, 100)
        ctxav.strokeStyle = "#000"

        ctx.drawImage(canvasAvatar, 250, 25, 100, 100)

        ctx.font = "35pt VictorMono"
        ctx.fillStyle = "black"
        ctx.fillText(`Bienvenido`, 30, 70, 200)

        ctx.font = "20pt VictorMono"
        ctx.fillStyle = "black"
        ctx.fillText(message.author.tag, 40, 110, 370)

        ctx.font = "15pt VictorMono"
        ctx.fillStyle = "black"
        ctx.fillText(`Bienvenid@ a ${message.guild.name}, Usuario #${message.guild.memberCount}`, 15, 150, 370)

        const ri = new MessageAttachment(canvas.toBuffer(), "welcome.png")
        return message.channel.send({ files: [ri], content: `Bienvenid@ ${message.author.toString()} Al server de ${message.guild.name}! Tu eres el miembro #${message.guild.memberCount}, Asegurate de leerte las reglas y demas para evitar posibles sanciones dentro del Server` })

    },
};
