import { useSelector } from 'react-redux'
import File from './file/File'
import './FileList.scss'

const FileList = () => {
  const files = useSelector((state) => state.files.files)

  return (
    <div className='file-list'>
      <div className='file-list__header'>
        <div className='file-list__name'>Name</div>
        <div className='file-list__date'>Date</div>
        <div className='file-list__size'>Size</div>
      </div>
      <div className='file-list__content'>
        {files?.map((file) => {
          return <File key={file._id} {...file} />
        })}
      </div>
    </div>
  )
}

export default FileList
