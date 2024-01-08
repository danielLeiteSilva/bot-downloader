const twitterGetUrl = require("twitter-url-direct")
const path = require('path')
const download = require('download-file')

async function downloadVideoTwitter(url) {
    try {
        let urlTwitter = await getUrlTwitter(url)
        await downloadFile(urlTwitter)
        return path.join(__dirname, "..", "videos", "twitter.mp4")

    } catch (error) {
        console.log(error)
        return
    }
}

function downloadFile(url) {
    return new Promise((resolve, reject) => {
        download(url, {
            directory: path.join(__dirname, "..", "videos"),
            filename: "twitter.mp4"
        }, function(err) {
            if(!err){
                resolve(true)
            }
        })
    })
}

async function getUrlTwitter(url) {
    try {
        const urlTwitter = urlTwitterClear(url)
        const urlVideoTwitter = await getUrlVideo(urlTwitter)
        return urlVideoTwitter["url"]
    } catch (error) {
        console.log(error)
        return
    }
}

function urlTwitterClear(url) {
    if (url.indexOf("?") !== -1) {
        url = url.substring(0, url.indexOf("?"))
    }
    return url.trim()
}

async function getUrlVideo(url) {
    try {
        let response = await twitterGetUrl(url)
        return {
            url: urlTwitterClear(response["download"][1]["url"]),
            name: response["tweet_user"]["text"]
        }
    } catch (error) {
        console.log(error)
        return
    }
}

module.exports = {
    downloadVideoTwitter,
    getUrlTwitter
}