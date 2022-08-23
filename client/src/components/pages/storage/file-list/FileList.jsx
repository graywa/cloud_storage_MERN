import { useSelector } from 'react-redux'
import { fileAPI } from '../../../../api/file-api'
import File from './file/File'
import './FileList.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useEffect, useState } from 'react'
import cn from 'classnames'
import { tags } from '../constants/tags'
import Loader from '../../../loader/Loader'
import { useDebaunce } from '../../../../hooks/useDebaunce'

const FileList = ({ sort, setSort }) => {
  const { currentDir, search } = useSelector((state) => state.files)
  const [getFiles, { data = [], isLoading, error }] =
    fileAPI.useLazyGetFilesQuery()

  const getFilesDebaunced = useDebaunce(getFiles, 500)
  
  useEffect(() => {
    getFilesDebaunced({ dirId: currentDir, sort, search })
  }, [search])

  useEffect(() => {
    getFiles({ dirId: currentDir, sort, search })
  }, [currentDir, sort])

  if (error) console.log(error)

  return (
    <div className='file-list'>
      <div className='file-list__header'>
        <div
          title='sort by type'
          onClick={(e) => setSort(tags.type)}
          className={cn('file-list__type', { active: sort === tags.type })}
        >
          Type
        </div>
        <div
          title='sort by name'
          onClick={(e) => setSort(tags.name)}
          className={cn('file-list__name', { active: sort === tags.name })}
        >
          Name
        </div>
        <div
          title='sort by date'
          onClick={(e) => setSort(tags.date)}
          className={cn('file-list__date', { active: sort === tags.date })}
        >
          Date
        </div>
        <div
          title='sort by size'
          onClick={(e) => setSort(tags.size)}
          className={cn('file-list__size', { active: sort === tags.size })}
        >
          Size
        </div>
      </div>
      <div className='file-list__content'>
        {isLoading && <Loader />}
        <TransitionGroup>
          {data.map((file) => {
            return (
              <CSSTransition
                key={file._id}
                timeout={500}
                classNames='file-anim'
                exit={false}
              >
                <File {...file} />
              </CSSTransition>
            )
          })}
        </TransitionGroup>
        {!data.length && !isLoading && <div className='empty-block'>Files not found</div>}
      </div>
      <p>*drag and drop files to the file list</p>
    </div>
  )
}

export default FileList
