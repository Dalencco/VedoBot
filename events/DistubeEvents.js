const client = require('../index');
const { MessageEmbed } = require('discord.js');

client.distube
    .on('playSong', (queue, song) => {
        const psembed = new MessageEmbed()
            .setTitle(`**Cancion Actual**`)
            .setDescription(`La cancion actual es: [${song.name}](${song.url}) - \`${song.formattedDuration}\`\nLikes: ${song.likes}\nSolicitado por: ${song.user}`)
            .setThumbnail(song.thumbnail)
            .setColor('#C00F0F')
        queue.textChannel.send({ embeds: [psembed] })
    })

    .on('addSong', (queue, song) => queue.textChannel.send (
        `Se agrego a la Cola: \`${song.name}\` - \`${song.formattedDuration}\`\nSolicitada por: ${song.user}`
    ))

    .on('searchResult', (message, result) => {
        let i = 0
        const srembed = new MessageEmbed()
            .setTitle(`**Elige una Cancion**`)
            .setDescription(`${result.map(song => `**${++i}**. ${song.name} - ${song.formattedDuration}`).join('\n')}\n*Solo tienes 30 Segundos para elegir una Cancion*`)
            .setColor('#C00F0F')
        message.channel.send({ embeds: [srembed] })
    })

    .on('searchCancel', message =>
        message.channel.send('Searching canceled'),
    )

    .on('searchInvalidAnswer', message =>
        message.channel.send('Invalid number of result.'),
    )

    .on('searchNoResult', message =>
        message.channel.send('No result found!'),
    )

    .on('searchDone', () => {})