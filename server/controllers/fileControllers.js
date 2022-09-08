const fileService = require('../services/fileService')
const User = require('../models/User')
const File = require('../models/File')
const path = require('path')
const fs = require('fs')

const uuid = require('uuid')

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent } = req.body
      const file = new File({ name, type, parent, user: req.user.id })
      const parentFile = await File.findOne({ _id: parent })
      if (!parentFile) {
        file.path = name
        await fileService.createDir(req, file)
      } else {
        file.path = path.normalize(`${parentFile.path}/${file.name}`)
        await fileService.createDir(req, file)
        parentFile.childs.push(file._id)
        await parentFile.save()
      }
      await file.save()
      return res.json(file)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: "Can't create folder" })
    }
  }

  async getFiles(req, res) {
    try {
      const { sort, search, parent } = req.query
      let files

      if (search) {
        files = await File.find({ user: req.user.id }).sort({ [sort]: 1 })
      } else {
        files = await File.find({ user: req.user.id, parent }).sort({
          [sort]: 1,
        })
      }

      files = files.filter((file) => file.name.includes(search))

      return res.json(files)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: "Can't get files" })
    }
  }

  async uploadFile(req, res) {
    try {
      const file = req.files.file
      const parent = await File.findOne({
        user: req.user.id,
        _id: req.body.parent,
      })
      const user = await User.findOne({ _id: req.user.id })

      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({ message: 'Not enough free space' })
      }

      user.usedSpace = user.usedSpace + file.size

      let serverPath
      if (parent) {
        serverPath = path.normalize(
          `${req.filePath}/${user._id}/${parent.path}/${file.name}`
        )
      } else {
        serverPath = path.normalize(`${req.filePath}/${user._id}/${file.name}`)
      }

      if (fs.existsSync(serverPath)) {
        return res.status(400).json({ message: 'Upload error' })
      }

      file.mv(serverPath)

      const type = file.name.split('.').pop()
      let filePath = file.name
      if (parent) {
        filePath = path.normalize(`${parent.path}/${file.name}`)
      }
      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: filePath,
        parent: parent ? parent._id : null,
        user: user._id,
      })

      await dbFile.save()
      await user.save()

      res.json(dbFile)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Upload error' })
    }
  }

  async downloadFile(req, res) {
    try {
      const file = await File.findOne({ _id: req.query._id, user: req.user.id })
      const path = fileService.getPath(req, file)
      if (fs.existsSync(path)) {
        return res.download(path, file.name)
      }
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Download error' })
    }
  }

  async deleteFile(req, res) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id })
      const user = await User.findOne({ _id: req.user.id })

      if (!file) {
        return res.status(400).json({ message: 'File not found' })
      }

      user.usedSpace = user.usedSpace - file.size
      await user.save()

      fileService.deleteFile(req, file)
      await file.remove()

      return res.json({ message: 'File was deleted' })
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'Maybe folder is not empty' })
    }
  }

  async uploadAvatar(req, res) {
    try {
      const avatar = req.files.file
      const avatarName = uuid.v4() + '.jpg'
      const avatarPath = path.normalize(`${req.staticPath}/${avatarName}`)
      avatar.mv(avatarPath)
      const user = await User.findById(req.user.id)
      user.avatar = avatarName
      user.save()

      return res.json(user)
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'Upload avatar error' })
    }
  }

  async deleteAvatar(req, res) {
    try {
      const user = await User.findById(req.user.id)
      fs.unlinkSync(path.normalize(`${req.staticPath}/${user.avatar}`))
      user.avatar = null
      user.save()

      return res.json(user)
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'Delete avatar error' })
    }
  }
}

module.exports = new FileController()
