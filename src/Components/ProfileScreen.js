import React from 'react';
import Nav from './Nav';
import "./ProfileScreen.css";
import avatar from "../Assets/lena.png"
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';

const ProfileScreen = () => {
    const user = useSelector(selectUser);
  return (
    <div className='profile'>
        <Nav />
        <div className="profile_body">
            <h1>Edit Profile</h1>
            <div className="profile_info">
                <img src={avatar} alt="Avatar" />
                <div className="profile_details">
                    <h2>{user.email}</h2>
                    <div className="profile_plans">
                        <h3>Plans</h3>
                        <div className="plan">
                            <h4>Netflix Standard</h4> 
                            <button className="plan_btn">Subscribe</button>
                        </div>
                        <div className="plan">
                            <h4>Netflix Basic</h4> 
                            <button className="plan_btn">Subscribe</button>
                        </div>
                        <div className="plan">
                            <h4>Netflix Premium</h4> 
                            <button className="plan_btn">Subscribe</button>
                        </div>
                        <button onClick={ ()=> auth.signOut()} 
                                className="profile_signout">
                                    Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileScreen