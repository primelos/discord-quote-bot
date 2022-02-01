// const {Discord, Intents} = require("discord.js");
require("dotenv").config();

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const sadWords = ["sad", "angry", "mad", "hate", "unhappy", "depressed"];
const encouragment = ["cheer up", "hang in there", "you are a great person"];

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "venegas",
    description: "Carlos Venegas!",
  },
  {
    name: "inspire",
    description: "quote displayed",
  },
  {
    name: sadWords,
  },
];
// console.log("CLIENT_ID", process.env.CLIENT_ID);
const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILDS
      ),
      {
        body: commands,
      }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
