const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    aliases: ['qe'],
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

            const qembed = new MessageEmbed()
                .setTitle("La cola de Canciones")
                .setDescription(`${queue.songs.map((song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`)
                .setColor("#C00F0F")

            return message.channel.send({ embeds: [qembed] });

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
