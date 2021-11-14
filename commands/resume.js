module.exports = {
    name: 'resume',
    description: '',
    run(message, args, distube) {
        if (!message.member.voice.channel) {
            return message.reply("You must be in a voice channel.")
        }
        distube.resumeSong = true
    }
}