const { Telegraf } = require('telegraf');

//Composition
const twitter = require('./services/Twitter')
const instagram = require('./services/Instagram')

const bot = new Telegraf("933198108:AAFChuapeL6Ypig4ZoNWczKlliKROdzqwuo");

async function start() {
    console.log("🤖 Bot started")
    
    bot.on('text', async (ctx) => {
        try {
            await ctx.telegram.sendMessage(ctx.message.chat.id, `💻 Recebemos sua solicitação. Aguarde alguns minutos para receber seu vídeo... 💻`);

            const host = hostNameVideoApp(ctx.message.text)
            await decisionDownloadVideo(host, ctx)

        } catch (error) {
            await ctx.telegram.sendMessage(ctx.message.chat.id, `Desculpe, não foi possível compreender sua solicitação. Tente novamente...`);
        }
        
    });
    
    bot.launch();
    
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));  
}

async function decisionDownloadVideo(host, ctx) {
    
    const decision = {
        "twitter": async function () {
            let path = await twitter.downloadVideoTwitter(ctx.message.text);
            await ctx.replyWithVideo({ source: path});
            
        },
        "instagram": async function () {
            let path = await instagram.downloadVideoInstagram(ctx.message.text);
            await ctx.replyWithVideo({ source: path});
        },
        "youtube": async function () {

        }
    }

    return decision[host]()

}

function hostNameVideoApp(url) {
    return url
        .split("/")[2]
        .replace("www", "")
        .replace("com", "")
        .replace(".", "")
        .replace(".", "")
        .trim()
}


module.exports = {
    start
}