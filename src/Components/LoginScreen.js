import React, {useState} from 'react'
import "./LoginScreen.css"
import logo from "../Assets/logo.png"
import SignupScreen from './SignupScreen';
const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className='loginScreen'>
        <div className ="login_bg">
            <img src={logo} alt ="Netflix-logo" className="login_logo" />
            <button className="login_btn" onClick={()=>setSignIn(true)}>
                Sign In
            </button>
            <div className="login_grad" /> 
        </div>
        <div className="login_body">
          {signIn ? (<SignupScreen />) :
          (<>
          <h1>
            Unlimited films, TV programs and more.
          </h1>
          <h2>
            Watch anywhere, Cancel at any time.
          </h2>
          <h5>
            Ready to watch? Enter your email to create or restart your membership.
          </h5>
          <div className="login_input">
            <form>
              <input type="email" placeholder="Email Address" />
              <button className="login_get" onClick={()=>setSignIn(true)} > Get Started </button>
            </form>
          </div>
          </>
          )}
        </div>
    </div>
  )
}

export default LoginScreen;