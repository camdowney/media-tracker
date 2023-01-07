import { Link } from 'react-router-dom'
import { Modal } from '.'
import { toggleModal, closeModal } from '../lib/util'
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Header() {
  const auth = getAuth()
  const [user] = useAuthState(auth)

  const closeMenu = () =>
    closeModal('#menu')

  const logout = async () => {
    try {
      closeMenu()
      await signOut(auth)
    }
    catch (e) {
      console.error(e)
    } 
  }
  
  return (
    <>
      <header>
        <div className='container'>
          <Link to='/lists' className='btn btn-nav'>Bucket List</Link>
          {user && <>
            <nav>
              <Links variant='nav' closeMenu={closeMenu} logout={logout} />
            </nav>
            <button onClick={() => toggleModal('#menu')} className='btn btn-dark menu-btn' aria-label='Toggle menu'><i className='fa fa-bars'></i></button>
          </>}
        </div>
      </header>
      <Modal
        id='menu'
        className='main-menu'
        transition='main-menu'
      >
        {user && <Links variant='menu' closeMenu={closeMenu} logout={logout} />}
      </Modal>
    </>
  )
}

const Links = ({ variant, closeMenu, logout }) => (
  <>
    <Link to='/lists' onClick={closeMenu} className={`btn btn-${variant}`}><i className='fa fa-bookmark' /> My Lists</Link>
    <Link to='/discover' onClick={closeMenu} className={`btn btn-${variant}`}><i className='fa fa-list' /> Discover</Link>
    <button onClick={logout} className={`btn btn-${variant}`}><i className='fa fa-sign-out' /> Logout</button>
  </>
)