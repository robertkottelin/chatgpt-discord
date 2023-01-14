require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

const { Configuration , OpenAIApi } = require('openai');
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY,
})
const openai = new OpenAIApi(configuration);




client.on('messageCreate', async function(message){
    try {
        const channelId = message.channel.id;
        const userId = message.author.id;
        if(message.author.bot) return;

        const gptResponse = await openai.createCompletion({
            model: "code-davinci-002",
            prompt: `Please answer this question:\n`,
            temperature: 0.7,
            max_tokens: 100,
            conversation_id: `channel_${channelId}_user_${userId}`,
            stop: ["ChatGPT:"],
        })

        message.reply(`${gptResponse.data.choices[0].text}`);
        return
    } catch(err){
        console.log(err)
    }
});


client.login(process.env.DISCORD_TOKEN)
  .then(() => {
    console.log("ChatGPT Bot is Online on Discord")
  })
  .catch(console.error);
