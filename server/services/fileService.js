const fs = require('fs')
const File = require('../models/File')
const config = require('config')

class FileService {

  createDir(file) {
    const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`
    return new Promise((res, rej) => {
      try {
        if(!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath)
          return res({message: 'File was created'})
        } else {
          return rej({message: 'File already exists'})
        }
      } catch (e) {
        return rej({message: 'File error'})
      }
    })
  }
} 

module.exports = new FileService()
