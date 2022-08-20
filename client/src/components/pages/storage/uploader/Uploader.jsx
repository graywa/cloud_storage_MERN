import './Uploader.scss'
import UploadFile from './UploadFile'
import close from '../../../assets/close.png'
import { useDispatch, useSelector } from 'react-redux'
import { hideUploader } from '../../../../store/reducers/uploadReducer'

const Uploader = () => {
  const {isShowUploader, files = []} = useSelector(state => state.uploadFiles)
  const dispatch = useDispatch()

  return (
    isShowUploader && (
      <div className='uploader'>
        <div className='uploader__header'>
          <h5>Upload files</h5>
          <img
            width={26}
            src={close}
            alt='close'
            onClick={() => dispatch(hideUploader())}
          />
        </div>

        <div className='uploader__files'>
          {files.map((file) => (
            <UploadFile key={file.id} {...file} />
          ))}
        </div>
      </div>
    )
  )
}

export default Uploader
