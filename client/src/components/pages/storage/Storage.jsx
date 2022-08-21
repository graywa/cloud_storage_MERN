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
import Uploader from './uploader/Uploader'
import { uploadAPI } from '../../../api/upload-api'
import { addFile, showUploader } from '../../../store/reducers/uploadReducer'

const Storage = () => {
  const [isOpen, setOpen] = useState(false)
  const [isShowDropArea, setShowDropArea] = useState(false)
  const dispatch = useDispatch()
  const { dirStack, currentDir } = useSelector((state) => state.files)

  const [createDir, { data, error }] = fileAPI.useCreateDirMutation()

  const createDirHandler = async (name, dirId) => {
    await createDir({
      name,
      dirId,
    }).unwrap()
    setOpen(false)
  }

  const [uploadFile] = uploadAPI.useUploadFileMutation()
  const [getFiles] = fileAPI.useLazyGetFilesQuery()

  const backHandler = () => {
    const backDirId = dirStack.at(-1)
    if (backDirId === undefined) return
    dispatch(setCurrDir({ currDir: backDirId }))
    dispatch(delDirFromStack())
  }

  const uploadFileHandler = async (files) => {
    await Promise.all(
      files.map((file, index) => {
        const formData = new FormData()
        formData.append('file', file)
        if (currentDir) {
          formData.append('parent', currentDir)
        }
        const fileToUpload = {
          id: Date.now(),
          name: file.name,
          progress: 0,
        }
        dispatch(showUploader())
        dispatch(addFile({ fileToUpload }))
        return uploadFile({ formData, dispatch, fileToUpload }).unwrap()
      })
    )

    getFiles({ dirId: currentDir })
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
  const dropHandler = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const files = [...e.dataTransfer.files]
    setShowDropArea(false)

    uploadFileHandler(files)
  }

  if (error) console.log(error.data.message)

  return (
    <div className='storage container'>
      <div className='storage__btns'>
        <button className='back' onClick={backHandler}>
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
            onChange={(e) => uploadFileHandler([...e.target.files])}
            multiple={true}
          />
        </label>
      </div>

      <div className='storage__content'>
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
            className='file-list-wrapper'
            onDragEnter={dragEnterHandler}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
          >
            <FileList />
          </div>
        )}
      </div>

      {isOpen && (
        <Modal setOpen={setOpen} createDirHandler={createDirHandler} />
      )}
      <Uploader />
    </div>
  )
}

export default Storage
