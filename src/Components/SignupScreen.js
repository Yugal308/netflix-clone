import React,{useRef,useState} from 'react'
import { auth } from '../firebase';
import Register from './Register';
import "./SignupScreen.css"

const SignupScreen = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [signUp, setSignUp] = useState(false);

  const signIn = (e)=>{
    e.preventDefault();
    auth.signInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    ).catch((error)=>{
      alert(error.message);
    });
  };
  return (
    <div className='signupscreen'>
      {signUp ? ( <Register/> ): 
      ( <>
          <form>
          <h1>Sign IN</h1>
          <input ref={emailRef} type='email' placeholder='Email' />
          <input ref={passwordRef} type='password' placeholder="Password" />
          <button type="submit" onClick={signIn}>Sign In</button>
          <h4>
            <span className="togray">New to Netflix? </span> 
            <span className="signupscreen_link" onClick={()=> setSignUp(true)}>Sign Up now. </span>
          </h4>
        </form>  
      </>)}
        
    </div>
  )
}

export default SignupScreen