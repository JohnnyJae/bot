const Discord = require('discord.js');

module.exports.run = async (bot, message) => {
  let user = message.mentions.users.first() || message.author; // Get User from mention
  let embed = new Discord.RichEmbed() 
  .setAuthor(`${user.username}'s profile`) // Embed's author
  .setThumbnail(user.avatarURL) // User's avatar
  .setColor('#A9A9A9') 
  .addField('Username', user.tag, true) // Username
  .addField('ID', user.id, true)
  .addField('Status', user.presence.status, true) // User status
  .addField('Joined at', message.member.joinedAt, true)
  .addField('Created at', user.createdAt, true)
  message.channel.send(embed) 
};

module.exports.help = {
  name: "profile"
}