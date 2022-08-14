import { useSelector } from 'react-redux'
import { fileAPI } from '../../../../api/file-api'
import File from './file/File'
import './FileList.scss'

const FileList = () => {
  const {currentDir} = useSelector((state) => state.files)
  const { data = [], isLoading, error } = fileAPI.useGetFilesQuery({
    dirId: currentDir,
  })

  if(isLoading) return <h3>Loading...</h3>

  return (
    <div className='file-list'>
      <div className='file-list__header'>
        <div className='file-list__name'>Name</div>
        <div className='file-list__date'>Date</div>
        <div className='file-list__size'>Size, B</div>
      </div>
      <div className='file-list__content'>
        {data.map((file) => {
          return <File key={file._id} {...file} />
        })}
      </div>
      <p>*drag files to the file list</p>
    </div>
  )
}

export default FileList
