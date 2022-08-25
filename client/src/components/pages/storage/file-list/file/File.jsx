import './File.scss'
import folder from '../../../../assets/folder.png'
import file from '../../../../assets/file.png'
import del from '../../../../assets/delete.png'
import download from '../../../../assets/download.png'
import { useDispatch, useSelector } from 'react-redux'
import {
  addDirToStack,
  setCurrDir,
} from '../../../../../store/reducers/fileReducer'
import { fileAPI } from '../../../../../api/file-api'
import { formatSize } from '../../../../../utils/forman-size'

const File = ({ view, _id, type, name, date, size }) => {
  const dispatch = useDispatch()
  const { currentDir } = useSelector((state) => state.files)
  const [downloadFile, { error: downloadError }] =
    fileAPI.useLazyDownloadFileQuery()
  const [deleteFile, { error: deleteError }] = fileAPI.useDeleteFileMutation()

  const openDirHandler = () => {
    if (type !== 'dir') return
    dispatch(addDirToStack({ dirId: currentDir }))
    dispatch(setCurrDir({ currDir: _id }))
  }

  const downloadHandler = async (e) => {
    e.stopPropagation()
    const response = await downloadFile({ _id })
    const downloadURL = response.data
    const link = document.createElement('a')
    link.href = downloadURL
    link.download = name
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const deleteHandler = async (e) => {
    e.stopPropagation()
    await deleteFile({ id: _id }).unwrap()
  }

  if (downloadError) console.log(downloadError.data.message)
  if (deleteError) console.log(deleteError.data.message)

  if (view === 'list') {
    return (
      <div className='file' onClick={openDirHandler}>
        <img width={26} src={type === 'dir' ? folder : file} alt='icon' />
        <div className='file__name'>{name}</div>
        <div className='file__date'>{date?.slice(0, 10)}</div>
        <div className='file__size'>{formatSize(size)}</div>
        {type !== 'dir' && (
          <button className='download' onClick={downloadHandler}>
            download
          </button>
        )}
        <button className='delete' onClick={deleteHandler}>
          delete
        </button>
      </div>
    )
  }

  if (view === 'grid') {
    return (
      <div className='file-grid' onClick={openDirHandler}>
        <img width={60} src={type === 'dir' ? folder : file} alt='icon' />
        <div className='file__name'>{name}</div>
        <div className='btns'>
          {type !== 'dir' && (
            <img
              width={32}
              src={download}
              className='download'
              title='download'
              onClick={downloadHandler}
              alt='download'
            />
          )}
          <img
              width={32}
              src={del}
              className='delete'
              title='delete'
              onClick={deleteHandler}
              alt='delete'
            />          
        </div>
      </div>
    )
  }
}

export default File
