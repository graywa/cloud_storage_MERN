import { useDispatch, useSelector } from 'react-redux'
import './Profile.scss'
import avatarLogo from '../../assets/avatar.png'
import { setUser } from '../../../store/reducers/userReducer'
import { fileAPI } from '../../../api/file-api'
import { baseUrl } from '../../../api/base-url'
import Loader from '../../loader/Loader'
import { useEffect } from 'react'
import upload from '../../assets/upload-white.png'
import delBtn from '../../assets/delBtn.png'

const Profile = () => {
  const { currentUser: user } = useSelector((state) => state.user)
  const [uploadAvatar, { data: uploadAvatarData, isLoading: uploadLoading }] =
    fileAPI.useUploadAvatarMutation()
  const [deleteAvatar, { data: deleteAvatarData, isLoading: deleteLoading }] =
    fileAPI.useDeleteAvatarMutation()
  const dispatch = useDispatch()

  const avatar = user?.avatar ? baseUrl + user.avatar : avatarLogo

  const uploadAvatarHandler = (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    uploadAvatar(formData).unwrap()
  }

  useEffect(() => {
    if (uploadAvatarData) {
      dispatch(setUser({ user: uploadAvatarData }))
    }
  }, [uploadAvatarData])

  const deleteAvatarHandler = () => {
    deleteAvatar().unwrap()
    if (deleteAvatarData) {
      dispatch(setUser({ user: deleteAvatarData }))
    }
  }

  useEffect(() => {
    if (deleteAvatarData) {
      dispatch(setUser({ user: deleteAvatarData }))
    }
  }, [deleteAvatarData])

  return (
    <div className='profile container'>
      <div className='profile__content'>
        <div className='profile__login'>Login: {user?.login}</div>
        <div className='profile__email'>Email: {user?.email}</div>
        <div className='profile__storage'>Starage space: {user?.usedSpace}</div>

        <div className='profile__avatar'>
          {uploadLoading || deleteLoading ? (
            <Loader />
          ) : (
            <img width={240} src={avatar} alt='avatar' />
          )}
        </div>

        <label htmlFor='avatar'>
          <input
            id='avatar'
            type='file'
            accept='image/*'
            onChange={uploadAvatarHandler}
          />
          <img width={24} src={upload} alt='upload' />
          Upload avatar
        </label>
        <button onClick={deleteAvatarHandler}>
          <img width={24} src={delBtn} alt='del' />
          Delete avatar
        </button>
      </div>
    </div>
  )
}

export default Profile
