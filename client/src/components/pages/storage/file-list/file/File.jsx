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
import { motion } from 'framer-motion'
import { setUser } from '../../../../../store/reducers/userReducer'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const File = ({ ind, view, _id, type, name, date, size }) => {
  const dispatch = useDispatch()
  const { currentDir: prevDir } = useSelector((state) => state.files)
  const { currentUser } = useSelector((state) => state.user)

  const [
    deleteFile,
    { error: deleteError, isLoading: isLoadDel },
  ] = fileAPI.useDeleteFileMutation()

  const [downloadFile, { error: downloadError, isFetching: isLoadDownload }] =
    fileAPI.useLazyDownloadFileQuery()

  const error = downloadError || deleteError

  const deleteHandler = async (e) => {
    e.stopPropagation()
    if (isLoading) return

    const data = await deleteFile({ id: _id }).unwrap()

    if (data) {
      const updUser = { ...currentUser }
      updUser.usedSpace -= size
      toast.success('File was deleted successfully')
      dispatch(setUser({ user: updUser }))
    }
  }

  const isLoading = isLoadDel || isLoadDownload

  const listVariants = {
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.1,
      },
    }),
    hidden: { opacity: 0, y: -50 },
  }

  const gridVariants = {
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.1,
      },
      //backgroundColor: '#ffffff'
    }),
    hidden: { opacity: 0, x: -50 },
  }

  const openDirHandler = () => {
    if (type !== 'dir') return
    const currentDir = { id: _id, name }
    dispatch(addDirToStack({ prevDir }))
    dispatch(setCurrDir({ currentDir }))
  }

  const downloadHandler = async (e) => {
    e.stopPropagation()
    if (isLoading) return

    const response = await downloadFile({ _id })
    const downloadURL = response.data
    const link = document.createElement('a')
    link.href = downloadURL
    link.download = name
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  useEffect(() => {
    if (error?.data) {
      toast.error(error.data.message)
    }
    if (error?.error) {
      toast.error(error.error)
    }
  }, [error])

  if (view === 'list') {
    return (
      <>
        {isLoadDel ? (
          <div className='file__delete'>Deleting...</div>
        ) : (
          <motion.div
            variants={listVariants}
            initial='hidden'
            animate='visible'
            custom={ind}
            className='file'
            onClick={openDirHandler}
          >
            <img
              className='file__icon'
              width={32}
              src={type === 'dir' ? folder : file}
              alt='icon'
            />
            <div className='file__name'>{name}</div>
            <div className='file__date'>{date?.slice(0, 10)}</div>
            <div className='file__size'>{formatSize(size)}</div>
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
          </motion.div>
        )}
      </>
    )
  }

  if (view === 'grid') {
    return (
      <>
        {isLoading ? (
          <div className='file__delete_grid'>Deleting...</div>
        ) : (
          <motion.div
            variants={gridVariants}
            initial='hidden'
            animate='visible'
            custom={ind}
            className='file-grid'
            onClick={openDirHandler}
          >
            <img className='file-grid__icon' width={60} src={type === 'dir' ? folder : file} alt='icon' />
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
          </motion.div>
        )}
      </>
    )
  }
}

export default File
