const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
  let responsetime = Math.round(bot.ping);
  let secondsUptime = Math.floor(bot.uptime / 1000); //Uptime returned in ms, divided by 1000 to get seconds.
  let minutesUptime = Math.floor(secondsUptime / 60); //Dividing spare seconds to get minutes.
  let hoursUptime = Math.floor(secondsUptime / 3600); //Getting hours from seconds w/ flooring.
  let daysUptime = Math.floor(hoursUptime / 24); //Getting days from seconds w/ flooring.
  secondsUptime = Math.floor(secondsUptime % 3600); //Getting spare from secondsUptime / 3600 and setting the variable to that result.
  
  /*Here, the result of the division between seconds, minutes etc is floored so the bot can get how many full seconds have passed. (i.e. 325s / 60s = 5.41, floored = 5 minutes)
  Multiplied by 60 for the seconds and minutes, and by 24 for the hours.*/
  let spare_s = Math.floor(secondsUptime / 60) * 60;
  let spare_m = Math.floor(minutesUptime / secondsUptime) * 60;
  let spare_h = Math.floor(hoursUptime / minutesUptime) * 24;
  console.log("Minutes: " + (minutesUptime - spare_m) + "\nSeconds: " + (secondsUptime - spare_s));
  let sicon = message.guild.iconURL; 
  let serverembed = new Discord.RichEmbed()
  .setDescription("Pong! :ping_pong:")
  .setColor("#42f4a1")
  .setThumbnail(sicon)
  .addField("Response time :speech_left:", responsetime + " ms")
  .addField("Uptime :clock1:", daysUptime + " days, " + hoursUptime + " hours, " + (minutesUptime - spare_m) + " minutes and " + (secondsUptime - spare_s) + " seconds.")
  //.addFooter("Serving " + bot.users.length + " users on " + bot.servers.length)

  return message.channel.send(serverembed);
}

module.exports.help = {
  name: "ping"
}