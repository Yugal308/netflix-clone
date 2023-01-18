import React,{useRef} from 'react'
import "./Register.css"
import { auth, db } from '../firebase';
import {setDoc,doc} from 'firebase/firestore'

const Register = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const signUp = (e)=>{
    e.preventDefault();
    auth.createUserWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value,
    ).then(setDoc(doc(db,'users',emailRef.current.value),{
      savedShows:[],
      name: nameRef.current.value
    })).catch((error)=>{
        alert(error.message);
    });
  };

  return (
    <div className='register'>
      <form>
        <h1>Sign Up</h1>
          <input ref={nameRef} type="text" placeholder="First Name" />
          <input ref={emailRef} type='email' placeholder='Email' />
          <input ref={passwordRef} type='password' placeholder="Password" />
          <button type="submit" onClick = {signUp}>Sign Up</button>
          {/* <h4>
            <span className="togray">Already a user </span> 
            <span className="register_link" onClick={()=> setSignIn(true)}>Sign In now. </span>
          </h4> */}
      </form>
    </div>
  )
}

export default Register