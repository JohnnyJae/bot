const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.reply("Usage: !8ball [question]");
    let question = args.slice().join(" ");
    let color = ""
    let replies = ['Yes', 'No', 'Ask again later'];
    let result = Math.floor((Math.random() * replies.length));

    if (replies[result] === 'Yes') color = "#00FF00";
    if (replies[result] === 'No') color = "#FF0000";
    if (replies[result] === 'Ask again later') color = "#FFFFFF";

    let newembed = new Discord.RichEmbed()
        .setAuthor(question)
        .setColor(color)
        .setDescription(`Asked By: ${message.author}\nResult: ${replies[result]}`);

    message.delete().catch(O_o => {});
    message.channel.send({
        embed: newembed
    })
};

module.exports.help = {
    name: "8ball"
}