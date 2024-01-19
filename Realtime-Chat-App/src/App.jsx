import React, { useEffect, useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register'
import firebase from './server/firebase'
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if(user){
        setCurrentUser(user);
      }else{
        setCurrentUser(null);
      }
    })
  }, [])

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element = {<Home name={currentUser}/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
