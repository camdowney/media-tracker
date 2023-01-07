import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Header, Footer } from './components'
import { MyLists, Discover, SingleMedia, Login, NotFound } from './pages'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function App() {
  const auth = getAuth()
  const [user] = useAuthState(auth)

  const Protected = ({ children }) =>
    user ? children : <Navigate to='/login' />

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