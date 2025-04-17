import React from 'react'
import './App.css'
import Login from './client/Components/Login/Login'
import Header from './client/Components/Header/Header'
import Products from './client/Pages/Products/Products'
import TechLogoSlider from './client/Pages/TechSlider/TechSlider'

function App() {
  
  return (
    <>
   {/* <Login/> */}
   <Header/>
   <Products/>
   <TechLogoSlider/>
    </>
  )
}

export default App
