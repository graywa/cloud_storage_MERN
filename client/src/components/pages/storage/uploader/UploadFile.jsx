import { useDispatch } from 'react-redux'
import { removeFile } from '../../../../store/reducers/uploadReducer'
import close from '../../../assets/close.png'

const UploadFile = ({ id, name, progress }) => {
  const dispatch = useDispatch()
  return (
    <div className='upload-file'>
      <div className='upload-file__header'>
        <div className='header__name'>{name}</div>
        <img width={16} src={close} alt='close' 
        onClick={() => dispatch(removeFile({id})) } />
      </div>

      <div className='upload-file__progress'>
        <div className='progress__bar' style={{width: `${progress}%`}} >
          <div className="progress__bar-in"></div>
        </div>
        <div className='progress__percent'>{progress}%</div>
      </div>
    </div>
  )
}

export default UploadFile
