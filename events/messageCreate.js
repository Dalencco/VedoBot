const client = require("../index");
const Rank = require("../models/Rank");
const Profile = require('../models/Profile');
const ms = require('ms');
const { timeout } = require("../index");
const { MessageEmbed } = require('discord.js');
const Config = require('../models/Config');

client.on("messageCreate", async (message) => {
    if (
        message.author.bot
    )
        return;

    if (message.channel.type === "DM") {
        message.author.send('Hola, soy Vedo Bot, un Bot creado por Kento. Log. Dev. En caso de que estes necesitando ayuda, espera a que un Mod o Dev te conteste.')

        const embed = new MessageEmbed()
            .setTitle(`Nuevo MD de ${message.author.tag}`)
            .setDescription(`El contenido del Mensaje es: \n**${message.content}**`)
            .addField("ID del Usuario: ", `**__${message.author.id}__**`)
            .addField("Usa: ", "\`v/reply [ID] [Contenido]\` Para enviarle un Mensaje")
            .setColor("RED")
            .setFooter(
                `Requerido por ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setTimestamp()

        return client.channels.cache.get("803130523664515102").send({ embeds: [embed] })
    } else {
        if (!message.content.toLowerCase().startsWith(client.config.prefix)) {
            const userfind = await Rank.findOne({ userid: message.author.id, guildid: message.guild.id })
            const uf = await Profile.findOne({ userid: message.author.id, guildid: message.guild.id })
    
            if (!uf) {
                const newProfile = new Profile({
                    guildid: message.guild.id,
                    userid: message.author.id,
                    bg: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwallpapercave.com%2Fwp%2FPvQFGZb.jpg&f=1&nofb=1",
                    description: "",
                    insigneas: [],
                    rep: 0,
                    rol: ""
                });
    
                await newProfile.save()
            }
    
            if (!userfind) {
                let gid = message.guild.id;
                let uid = message.author.id;
    
                const newRank = new Rank({
                    guildid: gid,
                    userid: uid,
                    xp: 0,
                    level: 0,
                    xpreq: 10
                });
    
                await newRank.save()
                
                return;
            } else {
                if (userfind.xpreq <= userfind.xp) {
                    let xp = userfind.xp + Math.floor(Math.random() * 5);
                    let level = userfind.level + 1;
                    let xpreq = userfind.xpreq * 2;
    
                    await Rank.findByIdAndUpdate(userfind._id, {
                        xp,
                        level,
                        xpreq
                    });

                    const rankChannel = await Config.findOne({ guildid: message.guild.id })

                    if (!rankChannel || !rankChannel.rankchannel) return message.reply(`<:test:793705007002157108> | Felicidades, subiste al nivel **${level}**`);

                    return client.channels.cache.get(rankChannel.rankchannel).send(`<:test:793705007002157108> | Felicidades ${message.author.toString()}, subiste al nivel **${level}**`);
                }
    
                else {
                    let xp = userfind.xp + Math.floor(Math.random() * 5);
    
                    await Rank.findByIdAndUpdate(userfind._id, {
                        xp
                    });
                    return;
                }
            }
        }
    
        const [cmd, ...args] = message.content
            .slice(client.config.prefix.length)
            .trim()
            .split(/ +/g);
    
        const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
    
        if (!command) return;
        
        if (command.cooldown) {
            if (timeout.has(`${command.name}${message.author.id}`)) {
                const cero_embed = new MessageEmbed()
                .setTitle(`<:netting_mal:858849837982416896> | ¡Hombre Espera!`)
                .setDescription(`Debes esperar \`${ms(timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: false })}\` para poder ejecutar el comando \`${command.name}\` de nuevo`)
                .setColor("FF0000")
                .setFooter(
                    `Requerido por ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
                .setTimestamp()
    
                return message.reply({ embeds: [cero_embed] })   
            } 
            await command.run(client, message, args);
            timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
            setTimeout(() => {
                timeout.delete(`${command.name}${message.author.id}`)
            }, command.cooldown)
        } else {
            await command.run(client, message, args);
        }
    }

    
});
