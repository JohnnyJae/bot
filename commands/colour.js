const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let existingRole = message.guild.roles.find("name", "#" + message.author.username); //Checks if the role already exists and if it does it'll be stored here.
if (existingRole == null){ //If the existingRole is null, then it will create a new role, otherwise it'll just edit the existing one that it has found.
  console.log("Created role: #" + message.author.username);
  let role = message.guild.roles.find(role => role.name === "#" + message.author.username);
  message.member.guild.createRole({
    name: "#" + message.author.username,
    color: "0x" + args[0],
    permissions: []
  }).then(role => message.member.addRole(role)).catch(console.error); //Adding the new role to the user.

} else {
  console.log(existingRole.name);
  console.log("Edited role: #" + message.author.username);
  existingRole.edit({
    name: "#" + message.author.username,
    color: "0x" + args[0],
    permissions: []
  })
}
message.channel.send(`All done! <@${message.author.id}>`); //Feedback for the user.
}

module.exports.help = {
  name: "colour"
}