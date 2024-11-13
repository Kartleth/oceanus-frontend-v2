import React from 'react'
import Navber from './Navber'
import Footer from './Footer'

export default function Layout({children}) {
  return (
    <>
        <Navbar/>
            {children}
        <Footer/>
    </>
  )
}
