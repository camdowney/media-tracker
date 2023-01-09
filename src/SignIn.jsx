import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
  
import { Hero } from './components'

import { useEffect, useRef, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
  
const firebaseUIConfig = {
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
  ],
  signInFlow: 'popup',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

export default function SignIn() {
  const auth = getAuth()
  const [user] = useAuthState(auth)
  
  const [userSignedIn, setUserSignedIn] = useState(false)

  const firebaseuiRef = useRef(null)
  
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/lists')
    }

    const firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)

    if (firebaseUIConfig.signInFlow === 'popup') {
      firebaseUiWidget.reset()
    }

    const unregisterAuthObserver = onAuthStateChanged(auth, user => {
      if (!user && userSignedIn) {
        firebaseUiWidget.reset()
      }

      setUserSignedIn(!!user)
    })

    firebaseUiWidget.start(firebaseuiRef.current, firebaseUIConfig)

    return () => {
      unregisterAuthObserver()
      firebaseUiWidget.reset()
    }
  }, [user, navigate, auth, firebaseUIConfig, userSignedIn])

  return (
    <main>
      <div>
        <Hero title='Sign in to use Media Tracker' />
        <section>
          <div className='container'>
            <div ref={firebaseuiRef} />
          </div>
        </section>
      </div>
    </main>
  )
}