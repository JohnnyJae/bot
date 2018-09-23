const config = require("./config.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {
  if(err)console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Command doens't exist.")
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded successfully`);
    bot.commands.set(props.help.name, props);
  });

});

//Will log to the console the bot is online and set the game status
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setActivity("over you", {type: "WATCHING"});
});

//Example echo command. Will echo everything after the prefix "!"
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot,message,args)

});

bot.login(config.token);
