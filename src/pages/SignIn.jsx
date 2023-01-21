
import { useEffect, useRef } from 'react'
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { Hero } from '../components'
  
const authConfig = {
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
  ],
  signInFlow: 'popup',
}

export default function SignIn() {
  const auth = getAuth()
  const authRef = useRef()

  useEffect(() => {
    const authWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)
    authWidget.start(authRef.current, authConfig)
  }, [])

  return (
    <main>
      <div>
        <Hero title='Sign in to use Media Tracker' />
        <section>
          <div className='container'>
            <div ref={authRef} />
          </div>
        </section>
      </div>
    </main>
  )
}