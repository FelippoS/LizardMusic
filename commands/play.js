module.exports = {
    name: 'play',
    description: '',
    membergroup: 'normal',
    run(message, args, distube) {
        if (!message.member.voice.channel) {
            return message.reply("You must be in a voice channel.")
        }
        let music = args.join(' ')
        distube.play(message, music)
    }
}