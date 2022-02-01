const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
require("dotenv").config();
const fetch = require("node-fetch");

const sadWords = ["sad", "angry", "mad", "hate", "unhappy", "depressed"];

const encouragment = ["cheer up", "hang in there", "you are a great person"];

async function getQuote() {
  return await fetch("https://zenquotes.io/api/random")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data[0]["q"] + " -" + data[0]["a"];
    });
}

// // const client = new Discord.Client();

// client.on("ready", () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on("message", (msg) => {
//   if (msg.content === "ping") {
//     msg.reply("pong");
//   }
// });

// client.login(process.env.TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (interaction.commandName === "venegas") {
    console.log("hit");
    await interaction.reply("Carlos Venegas!");
  } else if (interaction.commandName === "inspire") {
    console.log("here");
    await getQuote().then((quote) => interaction.channel.send(quote));
  }
  if (sadWords.some((word) => interaction.commandName.includes(word))) {
    const encourage =
      encouragment[Math.floor(Math.random() * encouragment.length)];
    await interaction.reply(encourage);
  }
});

client.login(process.env.TOKEN);
