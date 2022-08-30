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

const File = ({ ind, view, _id, type, name, date, size }) => {
  const dispatch = useDispatch()
  const { currentDir: prevDir } = useSelector((state) => state.files)
  const [downloadFile, { error: downloadError, isFetching: isLoadDownload }] =
    fileAPI.useLazyDownloadFileQuery()
  const [deleteFile, { error: deleteError, isLoading: isLoadDel }] =
    fileAPI.useDeleteFileMutation()

  const isLoading = isLoadDel || isLoadDownload

  const listVariants = {
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.2,
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
        duration: 0.2,
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

  const deleteHandler = async (e) => {
    e.stopPropagation()
    if (isLoading) return

    await deleteFile({ id: _id }).unwrap()
  }

  if (downloadError) console.log(downloadError.data.message)
  if (deleteError) console.log(deleteError.data.message)

  if (view === 'list') {
    return (
      <>
        {isLoading ? (
          <div className='file__delete'>Deleting...</div>
        ) : (
          <motion.div
            variants={listVariants}
            initial='hidden'
            animate='visible'
            custom={ind}
            whileHover={{ scale: 1.005 }}
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
            whileHover={{ 
              scale: 1.02, 
              //backgroundColor: '#f5f5f5' 
            }}
            className='file-grid'
            onClick={openDirHandler}
          >
            <img width={60} src={type === 'dir' ? folder : file} alt='icon' />
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
