import { useSelector } from 'react-redux'
import { fileAPI } from '../../../../api/file-api'
import File from './file/File'
import './FileList.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const FileList = () => {
  const { currentDir } = useSelector((state) => state.files)
  const {
    data = [],
    isLoading,
    error,
  } = fileAPI.useGetFilesQuery({
    dirId: currentDir,
  })

  if (isLoading) return <h3>Loading...</h3>

  return (
    <div className='file-list'>
      <div className='file-list__header'>
        <div className='file-list__name'>Name</div>
        <div className='file-list__date'>Date</div>
        <div className='file-list__size'>Size</div>
      </div>
      <div className='file-list__content'>
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
      </div>
      <p>*drag and drop files to the file list</p>
    </div>
  )
}

export default FileList
