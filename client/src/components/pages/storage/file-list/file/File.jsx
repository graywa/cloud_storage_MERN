import './File.scss'
import folder from '../../../../assets/folder.png'
import file from '../../../../assets/file.png'

const File = ({ type, name, date, size }) => {
  return (
    <div className='file'>
      <img width={26} src={type === 'dir' ? folder : file} alt='icon' />
      <div className='file__name'>{name}</div>
      <div className='file__date'>{date.slice(0,10)}</div>
      <div className='file__size'>{size}</div>
    </div>
  )
}

export default File
