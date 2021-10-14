const fs = require('fs')
const packageJson = require('./package.json')

const appVersion = packageJson.version

const jsonData = {
  version: appVersion
}

var jsonContent = JSON.stringify(jsonData)

fs.writeFile('./public/meta.json', jsonContent, 'utf-8',(err) => {
  if (err) {
    console.log('An error occured while writing JSON Object to meta.json')
    return console.log(err)
  }

  console.log('meta.json file has been saved with latest version number')
})