module.exports = {
    name: 'skip',
    description: '',
    run(message, args, distube) {
        if (!message.member.voice.channel) {
            return message.reply("You must be in a voice channel.")
        }
        distube.skip(message)
    }
}