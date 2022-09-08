const fs = require('fs')
const File = require('../models/File')
const config = require('config')
const path = require('path')

class FileService {
  createDir(req, file) {
    const filePath = this.getPath(req, file)
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

  deleteFile(req, file) {
    const path = this.getPath(req, file)
    if(file.type === 'dir') {
      fs.rmdirSync(path)
    } else {
      fs.unlinkSync(path)
    }
  }

  getPath(req, file) {
    return path.normalize(`${req.filePath}/${file.user}/${file.path}`) 
  }
} 

module.exports = new FileService()
