import './Uploader.scss'
import UploadFile from './UploadFile'
import close from '../../../assets/close.png'

const Uploader = () => {
  const files = [
    { id: 1, name: 'file1', progress: 70 },
    { id: 2, name: 'file2', progress: 23 },
    { id: 4, name: 'file3', progress: 42 },
    { id: 4, name: 'file3', progress: 11 },
  ]

  return (
    <div className='uploader'>
      <div className='uploader__header'>
        <h5>Upload</h5>
        <img width={26} src={close} alt="close" />
      </div>

      <div className="uploader__files">
        {files.map((file) => (
        <UploadFile key={file.id} {...file} />
      ))}
      </div>      
    </div>
  )
}

export default Uploader
