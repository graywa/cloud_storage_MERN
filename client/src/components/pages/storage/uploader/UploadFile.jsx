import close from '../../../assets/close.png'

const UploadFile = ({ name, progress }) => {
  return (
    <div className='upload-file'>
      <div className='upload-file__header'>
        <div className='header__name'>{name}</div>
        <img width={16} src={close} alt='close' />
      </div>

      <div className='upload-file__progress'>
        <div className='progress__bar' style={{width: {progress} + '%'}} />
        <div className='progress__percent'>{progress}%</div>
      </div>
    </div>
  )
}

export default UploadFile
