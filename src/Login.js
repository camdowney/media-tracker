import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
  
import Hero from '../components/Hero'

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

export default function LoginPage() {
  const auth = getAuth()
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

  const [userSignedIn, setUserSignedIn] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    if (user) {
      navigate('/lists')
    }

    const firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseAuth)
    if (uiConfig.signInFlow === 'popup')
        firebaseUiWidget.reset()

    const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, user => {
        if (!user && userSignedIn)
            firebaseUiWidget.reset()
        setUserSignedIn(!!user)
    })

    if (uiCallback)
        uiCallback(firebaseUiWidget)

    firebaseUiWidget.start(elementRef.current, uiConfig)

    return () => {
        unregisterAuthObserver()
        firebaseUiWidget.reset()
    }
  }, [user, navigate, auth, firebaseUIConfig, userSignedIn])

  return (
    <main>
    <div>
      <Hero title='Login to use Bucket List' />
      <section>
        <div className='container'>
          <div className={className} ref={elementRef} />
        </div>
      </section>
    </div>
    </main>
  )
}