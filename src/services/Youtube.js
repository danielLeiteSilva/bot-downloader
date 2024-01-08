const path = require('path')
const fs = require('fs');
const ytdl = require('ytdl-core');

async function downloadVideoYoutube(url) {
  try {
    await downloadFile(url)
    return path.join(__dirname, "..", "videos", "youtube.mp4")

  } catch (error) {
    console.log(error)
    return
  }
}

function downloadFile(url) {

  let pathFile = path.join(__dirname, "..", "videos", "youtube.mp4")

  return new Promise(async resolve => {
    ytdl(url, { filter: 'videoandaudio' })
      .pipe(fs.createWriteStream(pathFile))
      .on("finish", () => resolve(true))
  })
}

module.exports = {
  downloadVideoYoutube
}