module.exports = (Bot, Member) => { 
    console.log(Settings.Dependencies.Chalk.magenta(`
                                                ███▄ ▄███▓ ▄▄▄        ██████  ██ ▄█▀ ██▓
                                                ▓██▒▀█▀ ██▒▒████▄    ▒██    ▒  ██▄█▒ ▓██▒
                                                ▓██    ▓██░▒██  ▀█▄  ░ ▓██▄   ▓███▄░ ▒██▒
                                                ▒██    ▒██ ░██▄▄▄▄██   ▒   ██▒▓██ █▄ ░██░
                                                ▒██▒   ░██▒ ▓█   ▓██▒▒██████▒▒▒██▒ █▄░██░
                                                ░ ▒░   ░  ░ ▒▒   ▓▒█░▒ ▒▓▒ ▒ ░▒ ▒▒ ▓▒░▓  
                                                ░  ░      ░  ▒   ▒▒ ░░ ░▒  ░ ░░ ░▒ ▒░ ▒ ░
                                                ░      ░     ░   ▒   ░  ░  ░  ░ ░░ ░  ▒ ░
                                                    ░         ░  ░      ░  ░  ░    ░  

                                                            Created by GEN0C1DE.
                                                    Twitter: GEN0C1DE, GITHUB: GEN0C1DE
                                                        
                                                    -: SERVERID: ${Settings.Config.Server_ID}
                                                    -: INTERVAL: ${Settings.Config.User_Interval}
                                                    -: USERNAME: ${Bot.user.username.toUpperCase()}
                                                    -: USERID: ${Bot.user.id}

                                                    X: RANDOM MESSAGES?: ${Settings.Config.User_Settings.Sends_Random_Sentences}
                                                    X: REACT TO MESSAGES?: ${Settings.Config.User_Settings.Sends_Random_Sentences}
    `))
}