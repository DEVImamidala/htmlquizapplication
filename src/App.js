import React from 'react'
import './App.css'
import  Home from './Home'

import Submit from './Submit'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path ="/" element={<Home/>}/>
      <Route path ="/submit" element={<Submit/>}/>

       
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
