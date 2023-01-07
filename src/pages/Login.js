//import auth functions and variables from Firebase
import {
    getAuth,
    EmailAuthProvider,
    GoogleAuthProvider,
  } from "firebase/auth";
  import { useAuthState } from 'react-firebase-hooks/auth';
  import { useNavigate } from "react-router-dom";
  import { useEffect } from "react";
  
  //import the component
  import StyledFirebaseAuth from "../StyledFirebaseAuth";
  import Hero from '../components/Hero'
  
  //an object of configuration values
  const firebaseUIConfig = {
    signInOptions: [
      //array of sign in options supported
      //array can include just "Provider IDs", or objects with the IDs and options
      GoogleAuthProvider.PROVIDER_ID,
      { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
    ],
    signInFlow: "popup", //don't redirect to authenticate
    credentialHelper: "none", //don't show the email account chooser
    callbacks: {
      //"lifecycle" callbacks
      signInSuccessWithAuthResult: () => {
        return false; //don't redirect after authentication
      },
    },
  };
  
  //the React compnent to render
  function LoginPage() {
    const auth = getAuth(); //access the "authenticator"
    const [user] = useAuthState(auth)
    const navigate = useNavigate();
  
    useEffect(() => {
      if (user) {
        navigate('/lists')
      }
    }, [user, navigate])
  
    return (
      <main>
      <div>
        <Hero title='Login to use Bucket List' />
        <section>
          <div className='container'>
            <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
          </div>
        </section>
      </div>
      </main>
    );
  }
  
  export default LoginPage;