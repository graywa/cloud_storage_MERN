import { useSelector } from 'react-redux'
import File from './file/File'
import './FileList.scss'

const FileList = () => {
  //const files = useSelector((state) => state.files.files)
  const files = [
    {_id: 1, name: 'first', type: 'dir', size: '3gb', date: '20.02.22'},
    {_id: 2, name: 'second', type: 'dir', size: '1gb', date: '20.02.22'},
    {_id: 3, name: 'one', type: 'file', size: '0.5gb', date: '20.02.22'},
  ]

  return (
    <div className='file-list'>
      <div className='file-list__header'>
        <div className='file-list__name'>Name</div>
        <div className='file-list__date'>Date</div>
        <div className='file-list__size'>Size</div>
      </div>
      {files?.map(file => {
        return <File key={file.id} {...file} />
      })}
    </div>
  )
}

export default FileList
