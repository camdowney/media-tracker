import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthUser } from './lib/util'
import { Header, Footer } from './components'

import Loading from './Loading'
import MyLists from './MyLists'
import NotFound from './NotFound'
import Search from './Search'
import SignIn from './SignIn'
import SingleMedia from './SingleMedia'

export default function App() {
  const user = useAuthUser()

  function Protected({ children, signIn }) {
    if (user === false) {
      return <Loading />
    }

    return (!user != !signIn) // XOR operation - maybe not practical, but cool
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
        <Route path='/search' element={<Protected><Search /></Protected>} />
        <Route path='/media' element={<Protected><SingleMedia /></Protected>}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}