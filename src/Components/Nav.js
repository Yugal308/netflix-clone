import React, {useState,useEffect} from 'react'
import "./Nav.css"
import logo from "./../Assets/logo.png"
import avatar from "./../Assets/lena.png"
import { useNavigate } from 'react-router-dom';
const Nav = () => {

    const [show,handleShow] = useState(false);
    const navigate = useNavigate();
    const transitionNavBar = ()=>{
        if(window.scrollY>100){
            handleShow(true)
        }
        else{
            handleShow(false)
        }
    }

    useEffect(() =>{
        window.addEventListener("scroll", transitionNavBar);
        return () => window.addEventListener("scroll",transitionNavBar);
    },[] );

  return (
    <div className={`navbar ${show && "nav_black" }`}>
        <div className='nav_content'>
            <img onClick ={() => navigate("/")} src = {logo} alt = "Netflix Logo" className='nav_logo' />
            <button className='list' onClick={()=>navigate("/mylist")}>My List</button>
            <img onClick ={() => navigate("/profile")} src = {avatar} alt="Avatar" className="nav_avatar" />
        </div>
    </div>
  )
}

export default Nav