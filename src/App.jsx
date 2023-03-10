import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthUser } from './lib/util'
import { Header, Footer } from './components'
import {
  Loading,
  MyLists,
  NotFound,
  Search,
  SignIn,
  SingleMedia,
} from './pages'

export default function App() {
  const user = useAuthUser()

  function Protected({ children, signIn }) {
    if (user === false) {
      return <Loading />
    }

    return (!signIn !== !user)
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