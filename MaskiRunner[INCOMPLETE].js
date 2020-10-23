// Project Maski
// Coded by Genocide, Provided by the INE Community.

global.Settings = {
    Dependencies: {
       FS: require('fs'), // This is used to read file directories.
       Discord: require('discord.js-selfbot'), // This is used to access the Discord API Library.
       Chalk: require('chalk')  // This is used to access colors in the console.
    },
    UserInformation: {
        Bot: false
    }
}


// Defining Const Requirements of Dependencies.
const Discord = Settings.Depedencies.Discord
const FileSystem = Settings.Dependencies.FS
const Chalk = Settings.Dependencies.Chalk

// Requiring Settings
const Config = require(__dirname + '/config.js')
const Config_Script = `module.exports = {
    User_Settings: {
        Sends_Random_Sentences: false, // If set to true, will send messages at the set User_Interval.
        React_To_Mentions: false // If set to true, will react to @everyone, @here, and @user mentions.
    },
    User_Sentences: [], // The Sentences Sent Upon Mentioning at Random Selection.
    User_Interval: 10, // The Set Time to Send Random Sentences. Default = 10.
    User_Token: " " // Your Token Authorization Here. To automate your user account.
}`

if (!Config) {
    console.log("MASKI: Config.js not found. Creating a New Config File. Edit the Config File. Exiting Process.")
    var Stream = fs.writeFile('config.js', Config_Script, function (error) {
        if (!error) {
            console.log(Chalk.yellow("Created the Config.js File for the Program. Please edit it."))
        } else {
            console.log(Chalk.red("Couldn't create a Config.js File for the Program, please visit GEN0C1DE's Github account listed in the README.md"))
        }
    })
    process.exit(1)
}

// Creating a new Client.
Settings.UserInformation.Bot = new Discord.Client()

// Binding Event Connections.
var EventsDirectory = FileSystem.readSync('/events')
if (EventsDirectory) {
    EventsDirectory.forEach((File) => {
        try {
            if (File.split('.').slice(-1)[0] !== "js") return;
            let EventName = File.split('.')[0]
            
            let Event = require(__dirname + `/events/${File}`)
            Settings.UserInformation.Bot.on(EventName, Event.bind(null, Settings.UserInformation.Bot))
            delete require.cache([require.resolve(__dirname + `/events/${File}`)])
        } catch(Error) {
            console.error(Error)
        }
    })
}


if (Config.User_Token) {
    Settings.UserInformation.Bot.login(Config.User_Token).catch(error => {
        console.log(Chalk.red("MASkI: I've Encountered an Error: " + error))
        process.exit(1)
    })
} else {
    console.log(Chalk.red("MASKI: You didn't supply a user token! Please Edit the Config File. Exiting Process."))
    process.exit(1)
}
