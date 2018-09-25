const Discord = require('discord.js'); 

module.exports.run = async (bot, message) => {
    let user = message.mentions.users.first() || message.author; 
    let embed = new Discord.RichEmbed()
    .setAuthor(`${user.username}'s Avatar`)
    .setImage(user.displayAvatarURL) 
    .setColor('#A9A9A9')
    message.channel.send(embed)
};

module.exports.help = {
    name: "avatar"
  }