module.exports = {
        name: 'listMusic',
        description: '',
        run(message, args, distube) {
            if (!message.member.voice.channel) {
                return message.reply("You must be in a voice channel.")
            }
            const queue = distube.getQueue(message);
            if (!queue) {
                message.channel.send("Nothing is playing here.")
            } else {
                message.channel.send(`Current queue:\n${queue.songs.map((song, id) =>`**${id ? id : 'Playing'}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 10).join('\n')}`)
        }
    }
}