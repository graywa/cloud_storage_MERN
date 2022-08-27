import { useSelector } from 'react-redux'
import { fileAPI } from '../../../../api/file-api'
import File from './file/File'
import './FileList.scss'
import { useEffect, useState } from 'react'
import cn from 'classnames'
import { tags } from '../constants/tags'
import Loader from '../../../loader/Loader'
import { useDebaunce } from '../../../../hooks/useDebaunce'
import arrowDown from '../../../assets/down.png'

const FileList = ({ view, sort, setSort }) => {
  const { currentDir, search } = useSelector((state) => state.files)
  const [getFiles, { data = [], isFetching, error }] =
    fileAPI.useLazyGetFilesQuery()

  const getFilesDebaunced = useDebaunce(getFiles, 500)

  useEffect(() => {
    if(search) {
      getFilesDebaunced({ sort, search })
    }
  }, [search])

  useEffect(() => {
    if(!search) {
      getFiles({ dirId: currentDir, sort, search })
    } else {
      getFiles({ dirId: currentDir, sort, search })
    }
  }, [currentDir, sort, search])

  if (error) console.log(error)

  return (
    <div className='file-list'>
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
            {isFetching ? (
              <Loader />
            ) : (
              <>
                {data.length ? (
                  data.map((file) => {
                    return <File key={file._id} view={view} {...file} />
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
            {isFetching ? (
              <Loader />
            ) : (
              <div>
                {data.length ? (
                  data.map((file) => {
                    return <File key={file._id} view={view} {...file} />
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
