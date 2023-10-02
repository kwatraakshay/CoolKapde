//use rafce for the shortcut to create the arrow function

import React from 'react'
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Header/>
    <main className='py-3'>
      <Container>
     <Outlet></Outlet>
      </Container>
    </main>
    <Footer></Footer>
    <ToastContainer />
    </>
  )
}

export default App