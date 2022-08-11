import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fileAPI } from '../../../api/file-api'
import { addDir, delDirFromStack, setCurrDir, setFiles } from '../../../store/reducers/fileReducer'
import FileList from './file-list/FileList'
import Modal from './modal/Modal'
import './Storage.scss'

const Storage = () => {
  const [isOpen, setOpen] = useState(false)
  const dispatch = useDispatch()
  const {currentDir, dirStack} = useSelector((state) => state.files)
  const { data, isLoading, error } = fileAPI.useGetFilesQuery({
    dirId: currentDir,
  })

  const [createDir, {data: fileData}] = fileAPI.useCreateDirMutation()

  const createDirHandler = async (name, dirId) => {
    await createDir({
      name,
      dirId,
    })    
    setOpen(false)
  }

  useEffect(() => {
    if (data) {
      dispatch(setFiles({ files: data }))
    }

    if (fileData) {      
      dispatch(addDir({ file: fileData }))
    }
  }, [data, fileData])

  
  const backHandler = () => {    
    const backDirId = dirStack.at(-1)
    dispatch(setCurrDir({currDir: backDirId}))
    dispatch(delDirFromStack())
  }

  return (
    <div className='storage container'>
      <div className='storage__btns'>
        <button className='back' onClick={() => backHandler()}>Back</button>
        <button className='create' onClick={() => setOpen(true)}>
          Create folder
        </button>
      </div>
      <FileList />
      {isOpen && <Modal
        setOpen={setOpen}
        createDirHandler={createDirHandler}
      />}
    </div>
  )
}

export default Storage
