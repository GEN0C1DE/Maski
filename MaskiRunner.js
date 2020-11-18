// Project Maski
// Coded by Genocide, Provided by the INE Community.

global.Settings = {
	Config: undefined,
	Dependencies: {
		TG: require('txtgen'), // This is used to align text in console.
		FS: require('fs'), // This is used to read file directories.
		Discord: require('discord.js-selfbot'), // This is used to access the Discord API Library.
		Chalk: require('chalk')  // This is used to access colors in the console.
    },
	UserInformation: {
		Bot: false,
		Status: "Project Maski Online."
	}
}


// Defining Const Requirements of Dependencies.
const Discord = Settings.Dependencies.Discord
const FileSystem = Settings.Dependencies.FS
const Chalk = Settings.Dependencies.Chalk
const Text = Settings.Dependencies.TG

// Requiring Settings

var ConfigRequire = __dirname + '/config.json';
const Config_Script = `{
  "Server_ID": "", 
  "User_Settings": {
    "Sends_Random_Sentences": true 
  },
  "User_Status": "PROJECT MASKI ONLINE.", 
  "User_Interval": 10,
  "User_Token": "" 
}
`

if (!FileSystem.existsSync(ConfigRequire)) {
    console.log("MASKI: Config.json not found. Creating a New Config File. Edit the Config File. Exiting Process.")
    var Stream = FileSystem.writeFile('config.json', Config_Script, function (error) {
        if (!error) {
            console.log(Chalk.yellow("Created the Config.json File for the Program. Please edit it."))
        } else {
            console.error(Chalk.red("Couldn't create a Config.json File for the Program, please visit GEN0C1DE's Github account listed in the README.md"))
        }
    })
	return;
    //process.exit(1)
} else {
	Settings.Config = require(ConfigRequire)
	if (!Settings.Config.Server_ID || Settings.Config.Server_ID == "" || isNaN(Settings.Config.Server_ID) == true) {
		console.error(Chalk.red("You need to provide a Server ID for the Bot to begin it's stask."))
		return;
		//process.exit(0)
	} 
	if (!Settings.Config.User_Token || Settings.Config.User_Token == "") {
		console.log(Chalk.red("MASKI: You didn't supply a user token! Please Edit the Config File. Exiting Process."))
		return;
		//process.exit(0)
	}
}

// Creating a new Client.
Settings.UserInformation.Bot = new Discord.Client()

// Binding Event Connections.
var EventsDirectory = FileSystem.readdir('./events', (ERR, FILES) => {
	if (ERR) return console.log(Chalk.red("MASKI: Couldn't read the contents along the 'EVENTS' directory."));
	if (FILES) {
		FILES.forEach((File) => {
			try {
				if (File.split('.').slice(-1)[0] !== "js") return;
				let EventName = File.split('.')[0]
            
				let Event = require(__dirname + `/events/${File}`)
				Settings.UserInformation.Bot.on(EventName, Event.bind(null, Settings.UserInformation.Bot))
				console.log(Chalk.green(`MASKI: EVENT LOADED: ${EventName}.`))
			} catch(Error) {
				console.error(Error)
			}
		})
	}
})

// Ready Event Connections.
Settings.UserInformation.Bot.on("ready", async () => {
	let Guild = Settings.UserInformation.Bot.guilds.cache.get(Settings.Config.Server_ID)
	if (!Guild) {
		console.log(Chalk.red("MASKI: SERVER DOES NOT EXIST ON YOUR ACCOUNT!"))
		return;
		//process.exit(0);
	}
	
	let Status = Settings.Config.User_Status
	if (!Status || Status == "") {
		Settings.UserInformation.Bot.user.setActivity("PROJECT MASKI ONLINE", {type: "LISTENING", url: "https://twitch.tv/projectmaski"})
	} else {
		Settings.UserInformation.Bot.user.setActivity(Status, {type: "LISTENING", url: "https://twitch.tv/projectmaski"})
	}	
	
	console.clear()
	console.log(Chalk.magenta(`
								███▄ ▄███▓ ▄▄▄        ██████  ██ ▄█▀ ██▓
								▓██▒▀█▀ ██▒▒████▄    ▒██    ▒  ██▄█▒ ▓██▒
								▓██    ▓██░▒██  ▀█▄  ░ ▓██▄   ▓███▄░ ▒██▒
								▒██    ▒██ ░██▄▄▄▄██   ▒   ██▒▓██ █▄ ░██░
								▒██▒   ░██▒ ▓█   ▓██▒▒██████▒▒▒██▒ █▄░██░
								░ ▒░   ░  ░ ▒▒   ▓▒█░▒ ▒▓▒ ▒ ░▒ ▒▒ ▓▒░▓  
								░  ░      ░  ▒   ▒▒ ░░ ░▒  ░ ░░ ░▒ ▒░ ▒ ░
								░      ░     ░   ▒   ░  ░  ░  ░ ░░ ░  ▒ ░
								░         ░  ░      ░  ░  ░    ░  

								            Developer: GEN0C1DE.
								    Twitter: GEN0C1DE, GITHUB: GEN0C1DE
								   Shout Out to the INE Discord Community.
								
								-: SERVERID: ${Guild.id}
								-: SERVERNAME: ${Guild.name}
								-: USERNAME: ${Settings.UserInformation.Bot.user.username.toUpperCase()}
								-: USERID: ${Settings.UserInformation.Bot.user.id}

								X: RANDOM MESSAGES?: ${Settings.Config.User_Settings.Sends_Random_Sentences}
								X: RANDOM MESSAGES INTERVAL: ${Settings.Config.User_Interval}
	`))
	if (Settings.Config.User_Settings.Sends_Random_Sentences) {
		if (!isNaN(Settings.Config.User_Interval)) {
			if (Guild) {
				let Channels = Guild.channels.cache
				Channels.forEach((Channel) => {
					if (Channel.type == "text") {
						let BotMember = Guild.members.cache.get(Settings.UserInformation.Bot.user.id)
						if (BotMember) {
							if (BotMember.permissionsIn(Channel).has('SEND_MESSAGES')) {
								let ChannelChosen = Channel
								ChannelChosen.startTyping()
								let TimeInterval = setInterval(function() {
									let SentenceChosen = Text.sentence()
									ChannelChosen.send(SentenceChosen)
								}, Settings.Config.User_Interval * 1000)
							}
						}
					}
				})
			}
		}
	}
})

Settings.UserInformation.Bot.login(Settings.Config.User_Token).then(success => {
	console.log(Chalk.green(`MASKI: Successfully logged into account with token: ${Settings.Config.User_Token}`))
}).catch(error => {
	console.log(Chalk.red("MASKI: I've Encountered an Error: " + error))
	return
	//process.exit(0)
})

