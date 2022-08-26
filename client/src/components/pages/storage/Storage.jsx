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
import Uploader from './uploader/Uploader'
import { uploadAPI } from '../../../api/upload-api'
import { addFile, showUploader } from '../../../store/reducers/uploadReducer'
import { tags } from './constants/tags'
import list from '../../assets/list.svg'
import grid from '../../assets/grid.svg'
import back from '../../assets/back.png'
import addFolder from '../../assets/add-folder.png'
import upload from '../../assets/upload-white.png'
import uploadCloud from '../../assets/upload.png'

const Storage = () => {
  const [isOpen, setOpen] = useState(false)
  const [isShowDropArea, setShowDropArea] = useState(false)
  const [sort, setSort] = useState(tags.type)
  const [view, setView] = useState('list')

  const dispatch = useDispatch()
  const { dirStack, currentDir, search } = useSelector((state) => state.files)

  const [createDir, { error }] = fileAPI.useCreateDirMutation()

  const createDirHandler = async (name, dirId) => {
    await createDir({
      name,
      dirId,
    }).unwrap()
    setOpen(false)
  }

  const [uploadFile] = uploadAPI.useUploadFileMutation()
  const [getFiles, { isLoading }] = fileAPI.useLazyGetFilesQuery()

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

    getFiles({ dirId: currentDir, sort, search })
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
          <img width={24} src={back} alt="back" />
          Back
        </button>
        <button className='create' onClick={() => setOpen(true)}>
        <img width={24} src={addFolder} alt="add-folder" />
          Add folder
        </button>
        <label htmlFor='upload-file'>
        <img width={24} src={upload} alt="upload" />
          Upload file
          <input
            type='file'
            id='upload-file'
            onChange={(e) => uploadFileHandler([...e.target.files])}
            multiple={true}
          />
        </label>
        <div className='storage__view'>
          <img
            width={34}
            src={list}
            alt='list'
            title='list view'
            onClick={() => setView('list')}
          />
          <img
            width={38}
            src={grid}
            alt='grid'
            title='grid view'
            onClick={() => setView('grid')}
          />
        </div>
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
              <img width={50} src={uploadCloud} alt='upload' />
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
            <FileList view={view} sort={sort} setSort={setSort} />
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
