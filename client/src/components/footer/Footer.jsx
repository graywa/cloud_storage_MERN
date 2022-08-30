import './Footer.scss'
import github from '../assets/github.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='content container'>
        <div>Footer</div>
        <div className='year'>2022</div>
        <div className='developer'>        
          <a
            href='https://github.com/graywa'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img width={24} src={github} alt="github" />
            graywa
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
