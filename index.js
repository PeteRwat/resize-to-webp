const sharp = require ('sharp')
const fs = require('fs') 
const path = require('path')

if(process.argv.length !== 5){
    console.log(`Usage : 'node index.js 'path to original folder' 'path to output folder' 'scale factor'`)
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

        const image = sharp(originalPath)
        const width = image.metadata().then(async (metadata) => {
            console.log(metadata.width)
            await sharp(originalPath)
            .resize({ width: Math.round(metadata.width/process.argv[4]) })
            .toFile(outputPath)
        })
    })
}

processPhotos(fs.readdirSync(process.argv[2]))
      


