const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

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
const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (msg) => {
  console.log("msg", msg.content);
  if (sadWords.some((word) => msg.content.includes(word))) {
    const encourage =
      encouragment[Math.floor(Math.random() * encouragment.length)];
    await msg.reply(encourage);
  }
});

client.on("interactionCreate", async (interaction) => {
  // console.log("interACTION", interaction);

  // const string = interaction.options.getString("input");
  // console.log("string", string);

  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
    await wait(2000);
    await interaction.editReply("Pong again!");
  } else if (interaction.commandName === "venegas") {
    await interaction.reply("Carlos Venegas!");
  } else if (interaction.commandName === "inspire") {
    await getQuote().then((quote) => interaction.channel.send(quote));
  }

  interaction.channel.send("My message to react to.").then((sentMessage) => {
    // Unicode emoji
    sentMessage.react("👍");

    // Custom emoji
    // sentMessage.react("123456789012345678");
    // sentMessage.react("<emoji:123456789012345678>");
    // sentMessage.react("<a:emoji:123456789012345678>");
    // sentMessage.react("emoji:123456789012345678");
    // sentMessage.react("a:emoji:123456789012345678");
  });
});

client.on("CommandInteraction", async (inter) => {
  console.log("inter", inter);
});

client.login(process.env.TOKEN);

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
