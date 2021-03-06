module.exports = (Bot, Message) => { 
    if (Message.author.bot) return;
    if (Message.author.id == Bot.user.id) return;

    let Phrases = [
        "AFK",
        "CHECK",
        "REACT",
        "@EVERYONE",
        "@HERE"
    ]
	
	function SendingMessage() {
		let Sentences = Settings.Config.User_Settings.Sentences_Besides_Default
		if (Sentences.length !== 0) {
			let ChosenSentence = Sentences[Math.floor(Math.random() * Sentences.length)]
			Message.channel.send(ChosenSentence)
			.catch(ERR => {
				Message.react("\uD83D\uDE00")
				.catch(ERR2 => {
					console.log(Chalk.red("MASKI: COULDN'T REACT OR SEND MESSAGE."))
				})
			})
		} else {
			Message.channel.send("Not AFK")
			.catch(ERR => {
				Message.react("\uD83D\uDE00")
				.catch(ERR2 => {
					console.log(Chalk.red("MASKI: COULDN'T REACT OR SEND MESSAGE."))
				})
			})
		}
	}
	
    if (Message.guild.id == Settings.Config.Server_ID) {
		let ContentMentions = Message.mentions.users
		if (ContentMentions) {
			for (i = 0; i < ContentMentions.length; i++) {
				if (ContentMentions[i].id == Bot.user.id) {
					SendingMessage()
					return
				}
			}
		}
		
		let ContentLowercase = Message.content.toLowerCase()
        for (i = 0; i < Phrases.length; i++) {
			if (ContentLowercase.includes(Phrases[i].toLowerCase())) {
				SendingMessage()
				return
			}
		}
    }
}
