
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MUISignIn from './pages/mui/SignIn'
import NormalSignIn from './pages/normal/SignIn'
import Top from './pages/Top'

function App() {

  return (
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<MUISignIn />} />
        <Route path='normal' element={<NormalSignIn />} />
        <Route path='/top' element={<Top />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
