const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "resume",
    aliases: ['rm'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        const { member, guild, channel } = message;
        const VCM = member.voice.channel;

        if (!VCM) return message.channel.send("<:netting_mal:858849837982416896> | Debes estar en un Canal"); 

        if (guild.me.voice.channelId && VCM.id !== guild.me.voice.channelId) return message.channel.send("<:netting_mal:858849837982416896> | Debemos estar en el mismo Canal");

        try {

            const queue = await client.distube.getQueue(VCM);

            if (!queue) return message.channel.send("<:netting_mal:858849837982416896> | Debe haber una sesion de Canciones");

            await queue.resume(VCM);
            return message.channel.send("<:netting_bien:858849790284791808> | Continuando con la Cancion");

        }

        catch (e) {
            const embed = new MessageEmbed()
                .setTitle('An error ocurred!')
                .setDescription(`Contact with my Developer: Kento`)
                .setColor("RED");

            message.channel.send({ embeds: [embed] });
        }

    },
};
