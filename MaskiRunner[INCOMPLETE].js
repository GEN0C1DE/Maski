// Project Maski
// Coded by Genocide, Provided by the INE Community.

global.Settings = {
    Dependencies: {
       FS: require('fs'), // This is used to read file directories.
       Discord: require('discord.js'), // This is used to access the Discord API Library.
       Chalk: require('chalk')  // This is used to access colors in the console.
    },
    UserInformation: {
        Bot: false,
        Token: false
    }
}

// Defining Const Requirements of Dependencies.
const Discord = Settings.Depedencies.Discord
const FileSystem = Settings.Dependencies.FS
const Chalk = Settings.Dependencies.Chalk

// Creating a new Client.
Settings.UserInformation.Bot = new Discord.Client()
Settings.UserInformation.Bot.Commands = new Discord.Collection()

// Binding Event Connections.
var EventsDirectory = FileSystem.readSync('/src/events')
if (EventsDirectory) {
    EventsDirectory.forEach((File) => {
        try {
            if (File.split('.').slice(-1)[0] !== "js") return;
            let EventName = File.split('.')[0]
            
            let Event = require(__dirname + `/src/events/${File}`)
            Settings.UserInformation.Bot.on(EventName, Event.bind(null, Settings.UserInformation.Bot))
            delete require.cache([require.resolve(__dirname + `/src/events/${File}`)])
        } catch(Error) {
            console.error(Error)
        }
    })
}

// Binding Command Connections.
var GetCommands = async function(Client) {


}
