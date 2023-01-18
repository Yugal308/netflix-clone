import React,{useEffect} from 'react';
import './App.css';
import HomeScreen from './Components/HomeScreen';
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginScreen from './Components/LoginScreen';
import { auth } from './firebase';
import {useDispatch , useSelector} from "react-redux"
import {login,logout,selectUser} from "./features/userSlice"
import ProfileScreen from './Components/ProfileScreen';
import List from './Components/List';
import MovieScreen from './Components/MovieScreen';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth)=>{
        if(userAuth) {
          dispatch(
            login({
              uid: userAuth.uid,
              email: userAuth.email,
            })
          );
        }
        else{
          dispatch(logout());
        }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        {!user ? (<LoginScreen/> )
        : (<Routes>
          <Route path="/" element={ <HomeScreen />} />
          <Route path="/profile" element={ <ProfileScreen /> } />
          <Route path="/mylist" element={<List />} />
          <Route path="/details" element={<MovieScreen />} />
        </Routes>) 
        }
      </Router>
    </div>
  );
}

export default App;
