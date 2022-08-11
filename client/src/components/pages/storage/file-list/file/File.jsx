import './File.scss'
import folder from '../../../../assets/folder.png'
import file from '../../../../assets/file.png'
import { useDispatch, useSelector } from 'react-redux'
import { addDirToStack, setCurrDir } from '../../../../../store/reducers/fileReducer'

const File = ({ _id, type, name, date, size }) => {
  const dispatch = useDispatch()
  const {currentDir} = useSelector(state => state.files)

  const openDirHandler = () => {
    dispatch(addDirToStack({dirId: currentDir}))
    dispatch(setCurrDir({currDir: _id}))
  }

  return (
    <div className='file' onClick={() => type === 'dir' ? openDirHandler() : {}}>
      <img width={26} src={type === 'dir' ? folder : file} alt='icon' />
      <div className='file__name'>{name}</div>
      <div className='file__date'>{date?.slice(0,10)}</div>
      <div className='file__size'>{size}</div>
    </div>
  )
}

export default File
