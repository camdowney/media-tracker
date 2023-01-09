import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthUser } from './lib/util'
import { Header, Footer } from './components'

import Discover from './Discover'
import Loading from './Loading'
import MyLists from './MyLists'
import NotFound from './NotFound'
import SignIn from './SignIn'
import SingleMedia from './SingleMedia'

export default function App() {
  const user = useAuthUser()

  function Protected({ children, signIn }) {
    if (user === false) {
      return <Loading />
    }

    return (!!user + !!signIn === 1)
      ? children
      : <Navigate to={signIn ? '/lists' : '/sign-in'} />
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Protected signIn><SignIn /></Protected>} />
        <Route path='/sign-in' element={<Protected signIn><SignIn /></Protected>} />
        <Route path='/lists' element={<Protected><MyLists /></Protected>}/>
        <Route path='/discover' element={<Protected><Discover /></Protected>} />
        <Route path='/single-media' element={<Protected><SingleMedia /></Protected>}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}