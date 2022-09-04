import File from './file/File'
import './FileList.scss'
import cn from 'classnames'
import { tags } from '../constants/tags'
import Loader from '../../../loader/Loader'
import arrowDown from '../../../assets/down.png'
import back from '../../../assets/back-left.png'
import { useDispatch } from 'react-redux'
import {
  delDirsFromStack,
  setCurrDir,
} from '../../../../store/reducers/fileReducer'

const FileList = ({
  isLoading,
  files,
  view,
  sort,
  setSort,
  dirStack,
  currentDir,
}) => {
  const dispatch = useDispatch()

  const setDirHandler = (dir) => {
    dispatch(setCurrDir({ currentDir: dir }))
    dispatch(delDirsFromStack({ id: dir.id }))
  }

  const backHandler = () => {
    const prevDir = dirStack.at(-1)
    if (prevDir.id === undefined) return
    dispatch(setCurrDir({ currentDir: prevDir }))
    dispatch(delDirsFromStack({ id: prevDir.id }))
  }

  return (
    <div className='file-list'>
      <div className='file-list__path'>
        <span className='file-list__path-title'>path: </span>
        {dirStack.map((dir) => (
          <span key={dir.id}>
            <span
              className='file-list__link'
              onClick={() => setDirHandler(dir)}
            >
              {dir.name}
            </span>
            <span> \ </span>
          </span>
        ))}
        <span className='file-list__link'>{currentDir.name}</span>
        <span> \ </span>
      </div>
      {view === 'list' && (
        <>
          <div className='file-list__header'>
            <div
              title='sort by type'
              onClick={(e) => setSort(tags.type)}
              className={cn('file-list__type', {
                active: sort === tags.type,
              })}
            >
              Type
              {sort === tags.type && (
                <img width={16} src={arrowDown} alt='arrowDown' />
              )}
            </div>
            <div
              title='sort by name'
              onClick={(e) => setSort(tags.name)}
              className={cn('file-list__name', {
                active: sort === tags.name,
              })}
            >
              Name
              {sort === tags.name && (
                <img width={16} src={arrowDown} alt='arrowDown' />
              )}
            </div>
            <div
              title='sort by date'
              onClick={(e) => setSort(tags.date)}
              className={cn('file-list__date', {
                active: sort === tags.date,
              })}
            >
              Date
              {sort === tags.date && (
                <img width={16} src={arrowDown} alt='arrowDown' />
              )}
            </div>
            <div
              title='sort by size'
              onClick={(e) => setSort(tags.size)}
              className={cn('file-list__size', {
                active: sort === tags.size,
              })}
            >
              Size
              {sort === tags.size && (
                <img width={16} src={arrowDown} alt='arrowDown' />
              )}
            </div>
          </div>
          <div className='file-list__content'>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {currentDir.id && (
                  <div className='back' onClick={backHandler}>
                    <img width={24} src={back} alt='back' />
                    <span>...</span>
                  </div>
                )}

                {files.length ? (
                  files.map((file, ind) => {
                    return (
                      <File key={file._id} ind={ind} view={view} {...file} />
                    )
                  })
                ) : (
                  <div className='empty-block'>Files not found</div>
                )}
              </>
            )}
          </div>
        </>
      )}

      {view === 'grid' && (
        <>
          <div className='grid-header'>
            Sort by:
            <select onChange={(e) => setSort(e.target.value)}>
              <option value='type'>type</option>
              <option value='name'>name</option>
              <option value='date'>date</option>
              <option value='size'>size</option>
            </select>
          </div>
          <div className='file-list__content_grid'>
            {isLoading ? (
              <Loader />
            ) : (
              <div>
                {currentDir.id && (
                  <div className='back-grid' onClick={backHandler}>
                    <img width={36} src={back} alt='back' />
                    <span>...</span>
                  </div>
                )}

                {files.length ? (
                  files.map((file, ind) => {
                    return (
                      <File key={file._id} ind={ind} view={view} {...file} />
                    )
                  })
                ) : (
                  <div className='empty-block'>Files not found</div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      <p>*drag and drop files to the file list</p>
    </div>
  )
}

export default FileList
