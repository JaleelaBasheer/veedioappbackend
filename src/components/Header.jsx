import React from 'react'
import {Navbar,Container} from 'react-bootstrap';
import {  UploadCloud } from 'react-feather';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar className="bg-danger">
    <Container>
      <Navbar.Brand >
        <Link to={''} >
       
       <p className='text-light' style={{textDecoration:"none"}}> <UploadCloud color="white"/> Veedio.com</p>
       </Link>
        
      </Navbar.Brand>
    </Container>
  </Navbar>
  )
}

export default Header