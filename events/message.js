module.exports = (Bot, Message) => { 
    if (Message.author.bot) return;
    if (Message.author.id !== Bot.user.id) return;

    if (Message.guild.id == Settings.Config.Server_ID) {
        // More Code Coming Soon.
    }
}