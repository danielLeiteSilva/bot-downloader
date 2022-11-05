// function hostNameVideoApp() {
//     // let url = "https://www.instagram.com/reel/CkeTL6NjPmu/?igshid=YmMyMTA2M2Y="
//     let url = "https://www.youtube.com/watch?v=qCv5lZ570TE"
//     // let url = "https://twitter.com/desmentindobozo/status/1587582051070377987?t=Lp_UcxrXmbQKKxz2RIGzug&s=19"
//     // let url = "https://youtu.be/fm34lnrPuZM"


//     const hostName = url
//         .split("/")[2]
//         .replace("www", "")
//         .replace("com", "")
//         .replace(".", "")
//         .replace(".", "")
//         .trim()

//     console.log(hostName)
// }

// hostNameVideoApp()
const instagramGetUrl = require("instagram-url-direct")
const path = require('path')
// const { writeFileSync } = require('fs')

// const downloadfile = require('downloadfile')


const download = require('download-file')

const link = instagramGetUrl("https://www.instagram.com/reel/CkeTL6NjPmu/?igshid=YmMyMTA2M2Y=")
link.then(response => {
    console.log(response)
    download(response["url_list"][0], {
        directory: path.join(__dirname, "videos"),
        filename: "instagram.mp4"
    }, function(err) {
        if (err) throw(err)
    })
})



// download("https://video.twimg.com/ext_tw_video/1587582006484926466/pu/vid/638x360/36j68E4Yd6UKsFpJ.mp4", { directory: "./", filename: "video.mp4" })

// downloadfile("https://video.twimg.com/ext_tw_video/1587582006484926466/pu/vid/638x360/36j68E4Yd6UKsFpJ.mp4")

// getBinary("https://video.twimg.com/ext_tw_video/1587582006484926466/pu/vid/638x360/36j68E4Yd6UKsFpJ.mp4")
//     .then(response => {
//         // console.log(response)
//     })

// function getBinary(url) {
//     return new Promise((resolve, reject) => {
//         request.get(url, { headers: { "Content-type": "video/mp4" } }, (error, response, body) => {
//             if(!error) {
//                 if (response.statusCode === 200) {
//                     console.log(Buffer.from(body))
//                     writeFileSync("./teste.mp4", Buffer.from(body).toString('base64'), 'base64')
//                     return resolve(body)
//                 }
//             }
//         })
//     })
// }

// downloadVideoTwitter("https://twitter.com/desmentindobozo/status/1587582051070377987")

// async function downloadVideoTwitter(url) {
//     try {
//         const urlTwitter = urlTwitterClear(url)
//         const urlVideoTwitter = await getUrlVideo(urlTwitter)
//         const binary = await getBinary(urlVideoTwitter)
//         const base64 = convertBinaryToBase64(binary)

//         return base64

//     } catch (error) {
//         console.log(error)
//         return
//     }

// }

// function urlTwitterClear(url){
//     if(url.indexOf("?") !== -1){
//         url = url.substring(0, url.indexOf("?"))
//     }
//     return url.trim()
// }

// function convertBinaryToBase64(binary){
//     return Buffer.from(binary).toString('base64')
// }

// async function getUrlVideo(url) {
//     try {
//         let response = await twitterGetUrl(url)
//         return response["download"][1]["url"]
//     } catch (error) {
//         console.log(error)
//         return
//     }
// }

// function getBinary(url) {
//     return new Promise((resolve, reject) => {
//         request.get(url, (error, response, body) => {
//             if (!error) {
//                 if (response.statusCode === 200) {
//                     return resolve(body)
//                 }
//             }
//         })
//     })
// }