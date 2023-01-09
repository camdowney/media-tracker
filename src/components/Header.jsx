import { Link } from 'react-router-dom'
import { Modal } from '.'
import { useAuthUser, toggleModal, closeModal } from '../lib/util'
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth'

export default function Header() {
  const auth = getAuth()
  const user = useAuthUser()

  const closeMenu = () =>
    closeModal('#menu')

  async function signOut() {
    try {
      closeMenu()
      await firebaseSignOut(auth)
    }
    catch (err) {
      console.error(err)
    } 
  }
  
  return (
    <>
      <header>
        <div className='container'>
          <Link to='/lists' className='btn btn-nav'>Media Tracker</Link>
          {user && <>
            <nav>
              <Links variant='nav' closeMenu={closeMenu} signOut={signOut} />
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
        {user && <Links variant='menu' closeMenu={closeMenu} signOut={signOut} />}
      </Modal>
    </>
  )
}

const Links = ({ variant, closeMenu, signOut }) => (
  <>
    <Link to='/lists' onClick={closeMenu} className={`btn btn-${variant}`}><i className='fa fa-bookmark' /> My Lists</Link>
    <Link to='/discover' onClick={closeMenu} className={`btn btn-${variant}`}><i className='fa fa-list' /> Discover</Link>
    <button onClick={signOut} className={`btn btn-${variant}`}><i className='fa fa-sign-out' /> Sign out</button>
  </>
)