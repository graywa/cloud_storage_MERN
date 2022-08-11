import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fileAPI } from '../../../api/file-api'
import { addDir, setFiles } from '../../../store/reducers/fileReducer'
import FileList from './file-list/FileList'
import Modal from './modal/Modal'
import './Storage.scss'

const Storage = () => {
  const [isOpen, setOpen] = useState(false)
  const dispatch = useDispatch()
  const currDir = useSelector((state) => state.files.currentDir)
  const { data, isLoading, error } = fileAPI.useGetFilesQuery({
    dirId: currDir,
  })

  const [createDir, {}] = fileAPI.useCreateDirMutation()

  const createDirHandler = async () => {
    const res = await createDir({
      name: 'mored3',
      dirId: currDir,
    })
    const { data: file } = res
    dispatch(addDir({ file }))
    setOpen(false)
  }

  useEffect(() => {
    if (data) {
      dispatch(setFiles({ files: data }))
    }
  }, [data])

  return (
    <div className='storage container'>
      <div className='storage__btns'>
        <button className='back'>Back</button>
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
