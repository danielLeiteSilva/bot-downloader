const path = require('path')
const fs = require('fs');
const ytdl = require('ytdl-core');

async function downloadAudioYoutube(url) {
  try {
    await downloadFile(url)
    return path.join(__dirname, "..", "audio", "audio.mp3")

  } catch (error) {
    console.log(error)
    return
  }
}

function downloadFile(url) {

  let pathFile = path.join(__dirname, "..", "audio", "audio.mp3")

  return new Promise(async resolve => {
    ytdl(url, { filter: 'audioonly' })
      .pipe(fs.createWriteStream(pathFile))
      .on("finish", () => resolve(true))
  })
}

module.exports = {
  downloadAudioYoutube
}