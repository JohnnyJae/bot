const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
let xp = require("./xp.json");
bot.commands = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {
  if(err)console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Command doesn't exist.")
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

bot.on("guildMemberAdd", async member =>{
  console.log(`${member.id} joined the server.`);

  let welcomechannel = member.guild.channels.find(`name`, "general");
  let welcomeMessage = [`OH SHIT! ${member} is here!`, `OH DAMN! ${member} is here!`];
  let welcomeRandom = welcomeMessage[(Math.Floor(Math.random() * welcomeMessage.length))];
  welcomechannel.send(welcomeRandom);

});

bot.on("guildMemberRemove", async member => {

  console.log(`${member.id} has left the server.`);

  let welcomechannel = member.guild.channels.find(`name`, "general");
  welcomechannel.send(`OH SHIT! ${member} is here!`);

});

//Example echo command. Will echo everything after the prefix "!"
bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  //XP SYSTEM START
  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  // let curLvlInc = xp[message.author.id].level +1;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor("#42f4a1")
    .addField("New Level", curlvl + 1);
  // if (curLvlInc) {
  //   let gRole = message.guild.roles.find(`name`, admin);
  // }
  message.channel.send(lvlup);
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });

  let prefix = prefixes[message.guild.id].prefixes;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);


});

bot.login(botconfig.token);
