module.exports = {
  Server_ID: "", // This is required, this is to have a targetted server so the bot doesn't go haywire with other servers.
  User_Settings: {
    Sends_Random_Sentences: false, // If set to true, will send messages at the set User_Interval.
    React_To_Mentions: false // If set to true, will react to @everyone, @here, and @user mentions.
  },
  User_Sentences: [], // The Sentences Sent Upon Mentioning at Random Selection.
  User_Interval: 10, // The Set Time to Send Random Sentences. Default = 10.
  User_Token: " " // Your Token Authorization Here. To automate your user account.
}
