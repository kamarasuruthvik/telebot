process.env.NTBA_FIX_319 = 1

const { default: axios } = require('axios');
const telegramBot = require('node-telegram-bot-api');


const TOKEN = '5361534699:AAEFXUZKVpVJALCiIkYIJXfUgfis_eIZ2jw';

const bot = new telegramBot(TOKEN, {polling: true});

console.log('This is the token ',TOKEN);
async function getArticle(){
    try{
        const response = await axios.get("https://en.wikipedia.org/api/rest_v1/page/random/summary");
        
        console.log('The request is successful!!');
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}
bot.on('message', async (message) => {

    let data= await getArticle();
    const chatId= message.chat.id;
    bot.sendMessage(chatId, data.title);
    bot.sendMessage(chatId, data.extract);
})


