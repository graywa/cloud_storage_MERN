import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fileAPI } from '../../../api/file-api'
import {
  delDirFromStack,
  setCurrDir,
} from '../../../store/reducers/fileReducer'
import FileList from './file-list/FileList'
import Modal from './modal/Modal'
import './Storage.scss'

const Storage = () => {
  const [isOpen, setOpen] = useState(false)
  const dispatch = useDispatch()
  const { dirStack, currentDir } = useSelector((state) => state.files)

  const [createDir, { data }] = fileAPI.useCreateDirMutation()

  const createDirHandler = async (name, dirId) => {
    await createDir({
      name,
      dirId,
    }).unwrap()
    setOpen(false)
  }

  const [uploadFile, {}] = fileAPI.useUploadFileMutation()

  const backHandler = () => {
    const backDirId = dirStack.at(-1)
    if (backDirId === undefined) return
    dispatch(setCurrDir({ currDir: backDirId }))
    dispatch(delDirFromStack())
  }

  const uploadFileHandler = (e) => {
    const files = [...e.target.files]

    files.forEach(file => {
      const formData = new FormData()
        formData.append("file", file)
        if (currentDir) {
          formData.append("parent", currentDir)
        }

      uploadFile(formData).unwrap()
    })
  }

  return (
    <div className='storage container'>
      <div className='storage__btns'>
        <button className='back' onClick={() => backHandler()}>
          Back
        </button>
        <button className='create' onClick={() => setOpen(true)}>
          Create folder
        </button>
        <label htmlFor='upload-file'>
          Upload file
          <input
            type='file'
            id='upload-file'
            onChange={uploadFileHandler}
            multiple={true}
          />
        </label>
      </div>
      <FileList />
      {isOpen && (
        <Modal setOpen={setOpen} createDirHandler={createDirHandler} />
      )}
    </div>
  )
}

export default Storage
