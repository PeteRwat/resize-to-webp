const sharp = require ('sharp')
const fs = require('fs') 
const path = require('path')

if(process.argv.length !== 4){
    console.log(`Usage : 'node index.js 'path to PushSubscriptionOptions' 'path to output folder'`)
    process.exit(0)
}

const date = new Date
const dayMonth = `${date.getDate()}-${date.getMonth() + 1}`
const outputDir = path.join(process.argv[3], dayMonth)
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

const processPhotos = async (originalPhotos) => {
    originalPhotos.forEach(async photo => {
        const originalPath = path.join(process.argv[2], photo)
        const outputPath = path.join(outputDir, photo.replace('jpg', 'webp'))

        await sharp(originalPath)
            .toFile(outputPath)
    })
}

processPhotos(fs.readdirSync(process.argv[2]))
      


