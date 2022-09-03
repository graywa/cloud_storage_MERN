import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fileAPI } from '../../../api/file-api'
import FileList from './file-list/FileList'
import Modal from './modal/Modal'
import './Storage.scss'
import Uploader from './uploader/Uploader'
import { uploadAPI } from '../../../api/upload-api'
import { addFile, showUploader } from '../../../store/reducers/uploadReducer'
import { tags } from './constants/tags'
import list from '../../assets/list.svg'
import grid from '../../assets/grid.svg'
import addFolder from '../../assets/add-folder.png'
import upload from '../../assets/upload-white.png'
import uploadCloud from '../../assets/upload.png'
import { useDebaunce } from '../../../hooks/useDebaunce'
import { formatSize } from '../../../utils/forman-size'
import { motion, AnimatePresence } from 'framer-motion'
import { setUser } from '../../../store/reducers/userReducer'
import toast from 'react-hot-toast'

const Storage = () => {
  const [isOpen, setOpen] = useState(false)
  const [isShowDropArea, setShowDropArea] = useState(false)
  const [sort, setSort] = useState(tags.type)
  const [view, setView] = useState('list')
  const [filesSize, setFilesSize] = useState(0)

  const dispatch = useDispatch()

  const { dirStack, currentDir, search } = useSelector((state) => state.files)
  const { currentUser } = useSelector((state) => state.user)
  const { isLoading: isLoadUpload } = useSelector((state) => state.uploadFiles)


  const [
    createDir,
    {
      error: createDirError,
      isLoading: isLoadCreateDir,
      isSuccess: isCreateDirSuccess,
    },
  ] = fileAPI.useCreateDirMutation()

  const createDirHandler = async (name, dirId) => {
    if (!name) return
    await createDir({ name, dirId })
    setOpen(false)
  }

  const [uploadFile, { error: uploadError }] = uploadAPI.useUploadFileMutation()

  const [
    getFiles,
    {
      data: files = [],
      isFetching: isLoadGet,
      isSuccess: isGetSuccess,
      error: getError,
    },
  ] = fileAPI.useLazyGetFilesQuery()

  const getFilesDebaunced = useDebaunce(getFiles, 500)

  const uploadFileHandler = async (files) => {
    await Promise.all(
      files.map((file) => {
        setFilesSize((prev) => prev + file.size)

        const formData = new FormData()
        formData.append('file', file)
        if (currentDir.id) {
          formData.append('parent', currentDir.id)
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

    getFiles({ dirId: currentDir.id, sort, search })
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

  const isLoading = isLoadCreateDir || isLoadGet || isLoadUpload        
  const error = getError || createDirError || uploadError

  const usedSpace = formatSize(currentUser.usedSpace)
  const usedSpacePercent = (
    (currentUser.usedSpace / currentUser.diskSpace) *
    100
  ).toFixed(1)
  const totalSpace = formatSize(currentUser.diskSpace)

  useEffect(() => {
    if (search) {
      getFilesDebaunced({ sort, search })
    } else {
      getFiles({ dirId: currentDir.id, sort, search })
    }
  }, [currentDir.id, sort, search])

  useEffect(() => {
    if (filesSize && isGetSuccess) {
      const updUser = { ...currentUser }
      updUser.usedSpace += filesSize
      dispatch(setUser({ user: updUser }))
      setFilesSize(0)
      console.log(filesSize)
      toast.success('Files were uploaded')
    }
  }, [filesSize])

  useEffect(() => {
    if (isCreateDirSuccess) {
      toast.success('Folder was created')
    }
  }, [isCreateDirSuccess])

  useEffect(() => {
    if (error?.data) {
      toast.error(error.data.message)
    }
    if (error?.error) {
      toast.error(error.error)
    }
  }, [error])

  return (
    <main className='storage container'>
      <div className='storage__header'>
        <button className='create' onClick={() => setOpen(true)}>
          <img width={24} src={addFolder} alt='add-folder' />
          <span>Add folder</span>
        </button>
        <label htmlFor='upload-file'>
          <img width={24} src={upload} alt='upload' />
          <span>Upload file</span>
          <input
            type='file'
            id='upload-file'
            onChange={(e) => uploadFileHandler([...e.target.files])}
            multiple={true}
          />
        </label>
        <div className='storage__space'>
          <span>
            used <strong>{usedSpace}</strong> from <strong>{totalSpace}</strong>
          </span>
          <div className='space'>
            <div
              className='space__bar'
              style={{ width: `${usedSpacePercent}%` }}
            >
              <div className='space__bar-in'></div>
            </div>
            <div className='space__percent'>{usedSpacePercent}%</div>
          </div>
        </div>
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
        {isShowDropArea && (
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
        )}

        <div
          className='file-list-wrapper'
          onDragEnter={dragEnterHandler}
          onDragOver={dragOverHandler}
        >
          <FileList
            isLoading={isLoading}
            files={files}
            view={view}
            sort={sort}
            setSort={setSort}
            dirStack={dirStack}
            currentDir={currentDir}
          />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Modal setOpen={setOpen} createDirHandler={createDirHandler} />
          </motion.div>
        )}
      </AnimatePresence>

      <Uploader />
    </main>
  )
}

export default Storage
