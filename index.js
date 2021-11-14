const discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const distube = require('distube')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES, new Intents(32767)] });
const config = require('./config.json')
const youtube = require('@distube/ytdl-core')
const fs = require('fs')


let Distube = new distube.DisTube(client, {
    searchSongs: 1,
    searchCooldown: 30,
    leaveOnEmpty: true,
    emptyCooldown: 0,
    leaveOnFinish: true,
    leaveOnStop: true
})

client.commands = new discord.Collection();

fs.readdirSync('./commands').filter(file => file.endsWith('.js')).forEach(file => {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
    console.log('Passed!')
})
client.on('ready', () => {
        console.log("Ready, let's play music")
    })
    /* This code will run when the client receives a interaction */
client.on('messageCreate', message => {

    if (message.author.bot || !message.content.startsWith(config.prefix)) return;
    let args = message.content.substring(config.prefix.length).split(' ')
    let command = args[0]
    client.commands.get(command).run(message, args, Distube)
})
Distube
    .on('playSong', (queue, song) =>
        queue.textChannel.send(
            `Playing \`${song.name}\` - \`${
                song.formattedDuration
            }\`\nRequested by: ${song.user}\n`,
        ))
    .on('addSong', (queue, song) =>
        queue.textChannel.send(
            `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
        ))
    .on('finishSong', queue => queue.textChannel.send('Finish song!'))
client.login(config.token)