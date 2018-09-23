const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
  .setDescription("Server Info")
  .setColor("#42f4a1")
  .setThumbnail(sicon)
  .addField("Server Name", message.guild.name)
  .addField("Join Date", message.member.joinedAt)
  .addField("Number of Members", message.guild.memberCount);

  return message.channel.send(serverembed);
}

module.exports.help = {
  name: "serverinfo"
}
