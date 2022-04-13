import React from 'react'
import './Header.css'
import Navbar from './Navbar.js'

function Header() {
  return (
    <div className='header-body'>
      <h1>Cocktails</h1>
      <Navbar/>
    </div>
  )
}

export default Header