
import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Sign_up from './Pages/Sign_up'
import Login from './Pages/Login'
import Profile from './Pages/Profile'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Sign_up/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
    </Router>
  )
}

export default App