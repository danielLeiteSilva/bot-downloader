const { Telegraf } = require('telegraf');

//Composition
const twitter = require('./services/Twitter')
const instagram = require('./services/Instagram')
const youtube = require('./services/Youtube')
const audio = require('./services/Audio')

const bot = new Telegraf("933198108:AAFChuapeL6Ypig4ZoNWczKlliKROdzqwuo");

async function start() {
    console.log("🤖 Bot started")

    bot.on('text', async (ctx) => {
        try {

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
            await ctx.telegram.sendMessage(ctx.message.chat.id, `💻 Recebemos sua solicitação. Aguarde alguns minutos para receber seu vídeo... 💻`);
            let path = await twitter.downloadVideoTwitter(ctx.message.text);
            await ctx.replyWithVideo({ source: path });

        },
        "instagram": async function () {
            await ctx.telegram.sendMessage(ctx.message.chat.id, `💻 Recebemos sua solicitação. Aguarde alguns minutos para receber seu vídeo... 💻`);
            let path = await instagram.downloadVideoInstagram(ctx.message.text);
            await ctx.replyWithVideo({ source: path });
        },
        "youtube": async function () {

            let regex = /\s/gi
            let mp3 = ctx.message.text.split(regex)

            if (mp3.length === 1) {
                if (mp3[0].toLowerCase().search("mp3") !== -1) {
                    await ctx.telegram.sendMessage(ctx.message.chat.id, `Desculpe, não foi possível compreender sua solicitação. Coloque um espaço entre Mp3 e o vídeo!`);
                } else {
                    await ctx.telegram.sendMessage(ctx.message.chat.id, `💻 Recebemos sua solicitação. Aguarde alguns minutos para receber seu vídeo... 💻`);
                    let path = await youtube.downloadVideoYoutube(mp3[0]);
                    await ctx.replyWithVideo({ source: path });
                }
            } else {
                if (mp3[0].toLowerCase() === "mp3") {
                    await ctx.telegram.sendMessage(ctx.message.chat.id, `💻 Recebemos sua solicitação. Aguarde alguns minutos para receber seu Áudio... 💻`);
                    let path = await audio.downloadAudioYoutube(mp3[1])
                    await ctx.replyWithVoice({ source: path });
                }
            }
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