import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Header, Footer } from './components'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

import Discover from './Discover'
import Login from './Login'
import MyLists from './MyLists'
import NotFound from './NotFound'
import SingleMedia from './SingleMedia'

export default function App() {
  const auth = getAuth()
  const [user] = useAuthState(auth)

  function Protected({ children }) {
    return user
      ? children
      : <Navigate to='/login' />
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/lists' element={<Protected><MyLists /></Protected>}/>
        <Route path='/discover' element={<Protected><Discover /></Protected>} />
        <Route path='/single-media' element={<Protected><SingleMedia /></Protected>}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}