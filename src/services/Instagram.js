const instagramGetUrl = require("instagram-url-direct")
const path = require('path')
const download = require('download-file')

async function downloadVideoInstagram(url) {
    try {
        let urlTwitter = await getUrlInstagram(url)
        await downloadFile(urlTwitter)
        return path.join(__dirname, "..", "videos", "instagram.mp4")

    } catch (error) {
        console.log(error)
        return
    }
}

function downloadFile(url) {
    return new Promise((resolve, reject) => {
        download(url, {
            directory: path.join(__dirname, "..", "videos"),
            filename: "instagram.mp4"
        }, function(err) {
            if(!err){
                resolve(true)
            }
        })
    })
}

async function getUrlInstagram(url) {
    try {
        const urlVideoTwitter = await getUrlVideo(url)
        return urlVideoTwitter["url"]
    } catch (error) {
        console.log(error)
        return
    }
}


async function getUrlVideo(url) {
    try {
        let response = await instagramGetUrl(url)
        return {
            url: response["url_list"][0]
        }
    } catch (error) {
        console.log(error)
        return
    }
}

module.exports = {
    downloadVideoInstagram
}