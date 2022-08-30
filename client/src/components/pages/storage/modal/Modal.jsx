import { useState } from 'react'
import './Modal.scss'
import close from './../../../assets/delete.png'
import addFolder from './../../../assets/add-folder.png'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

const Modal = ({ setOpen, createDirHandler }) => {
  const [value, setValue] = useState('')
  const currDir = useSelector((state) => state.files.currentDir)

  return (
    <div className='modal' onClick={() => setOpen(false)}>
      <motion.div
        initial={{ opacity: 0, y: -300 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{opacity: 0, y: -300}}
        className='content'
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type='text'
          placeholder='Folder name'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) =>
            e.key === 'Enter' && createDirHandler(value, currDir.id)
          }
        />
        <img
          width={42}
          src={close}
          alt='close'
          onClick={() => setOpen(false)}
        />
        <button
          className='create'
          onClick={() => createDirHandler(value, currDir.id)}
        >
          <img width={24} src={addFolder} alt='add-folder' />
          Create folder
        </button>
      </motion.div>
    </div>
  )
}

export default Modal
