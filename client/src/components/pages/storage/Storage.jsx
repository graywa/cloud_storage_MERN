import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fileAPI } from '../../../api/file-api'
import { setFiles } from '../../../store/reducers/fileReducer'
import FileList from './file-list/FileList'
import './Storage.scss'

const Storage = () => {
  const dispatch = useDispatch()
  const currDir = useSelector((state) => state.files.currentDir)
  const { data, isLoading, error } = fileAPI.useGetFilesQuery({
    dirId: currDir,
  })

  useEffect(() => {
    if (data) {      
      dispatch(setFiles({ files: data }))
    }
  }, [data])

  return <div className='storage container'>
      <div className="storage__btns">
        <button className="back">Back</button>
        <button className="create">Create folder</button>
      </div>
      <FileList />
    </div>
}

export default Storage
