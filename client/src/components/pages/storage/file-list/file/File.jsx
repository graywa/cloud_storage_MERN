import './File.scss'
import folder from '../../../../assets/folder.png'
import file from '../../../../assets/file.png'
import { useDispatch, useSelector } from 'react-redux'
import {
  addDirToStack,
  setCurrDir,
} from '../../../../../store/reducers/fileReducer'
import { fileAPI } from '../../../../../api/file-api'

const File = ({ _id, type, name, date, size }) => {
  const dispatch = useDispatch()
  const { currentDir } = useSelector((state) => state.files)
  const [downloadFile, {}] = fileAPI.useLazyDownloadFileQuery()

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

  return (
    <div className='file' onClick={openDirHandler}>
      <img width={26} src={type === 'dir' ? folder : file} alt='icon' />
      <div className='file__name'>{name}</div>
      <div className='file__date'>{date?.slice(0, 10)}</div>
      <div className='file__size'>{size}</div>
      {type !== 'dir' && (
        <button className='download' onClick={downloadHandler}>
          download
        </button>
      )}
      <button className='delete'>delete</button>
    </div>
  )
}

export default File
