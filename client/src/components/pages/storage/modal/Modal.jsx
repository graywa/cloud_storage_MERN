import { useState } from 'react'
import './Modal.scss'
import close from './../../../assets/close.png'
import { useSelector } from 'react-redux'

const Modal = ({ setOpen, createDirHandler }) => {
  const [value, setValue] = useState('')
  const currDir = useSelector(state => state.files.currentDir)

  return (
    <div className='modal' onClick={() => setOpen(false)}>
      <div className='content' onClick={(e) => e.stopPropagation()}>
        <input
          type='text'
          placeholder='Folder name'
          value={value}
          onChange={e => setValue(e.target.value)}
        />        
        <img
          width={34}
          src={close}
          alt='close'
          onClick={() => setOpen(false)}
        />
        <button className='create' onClick={() => createDirHandler(value, currDir)}>
          Create folder
        </button>
      </div>
    </div>
  )
}

export default Modal
