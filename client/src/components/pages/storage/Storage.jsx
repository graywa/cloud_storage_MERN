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
import upload from '../../assets/upload.png'

const Storage = () => {
  const [isOpen, setOpen] = useState(false)
  const [isShowDropArea, setShowDropArea] = useState(false)
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

    files.forEach((file) => {
      const formData = new FormData()
      formData.append('file', file)
      if (currentDir) {
        formData.append('parent', currentDir)
      }
      uploadFile(formData).unwrap()
    })
  }

  const dragEnterHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDropArea(true)
  }

  const dragOverHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDropArea(true)
  }

  const dragLeaveHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDropArea(false)
  }

  const dropHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const files = [...e.dataTransfer.files]

    files.forEach((file) => {
      const formData = new FormData()
      formData.append('file', file)
      if (currentDir) {
        formData.append('parent', currentDir)
      }
      uploadFile(formData).unwrap()
    })

    setShowDropArea(false)
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

      {isShowDropArea ? (
        <div
          className='drop-area'
          onDragEnter={dragEnterHandler}
          onDragOver={dragOverHandler}
          onDragLeave={dragLeaveHandler}
          onDrop={dropHandler}
        >
          <p>
            <img width={50} src={upload} alt='upload' />
            Drag and drop files here
          </p>
        </div>
      ) : (
        <div
          onDragEnter={dragEnterHandler}
          onDragOver={dragOverHandler}
          onDragLeave={dragLeaveHandler}
        >
          <FileList />
        </div>
      )}

      {isOpen && (
        <Modal setOpen={setOpen} createDirHandler={createDirHandler} />
      )}
    </div>
  )
}

export default Storage
