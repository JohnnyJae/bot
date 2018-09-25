const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.member.guild.createRole({
    name: "#" + message.member.username,
    color: "0x" + args[0],
    permissions: []
    })
  message.member.addRole("#" + message.member.username);
}

module.exports.help = {
  name: "colour"
}