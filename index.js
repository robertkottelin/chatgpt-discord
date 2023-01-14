require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

// const { Configuration , OpenAIApi } = require('openai');
// const configuration = new Configuration({
//     organization: process.env.OPENAI_ORG,
//     apiKey: process.envOPENAI_KEY,
// })
// const openai = new OpenAIApi(configuration);

client.on('messageCreate', async function(message){
    try {
        if(message.author.bot) return;
        console.log(message.content);
        message.reply(`You said: ${message.content}`);
    } catch(err){
        console.log(err)
    }
});

client.login(process.env.DISCORD_TOKEN)
  .then(() => {
    console.log("ChatGPT Bot is Online on Discord")
  })
  .catch(console.error);
