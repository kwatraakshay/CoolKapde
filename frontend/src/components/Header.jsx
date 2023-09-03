import {Navbar,Nav,Container, Badge, NavDropdown} from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import logo from '../assets/logo.png'
import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import {logout} from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  
  const {cartItems} = useSelector((state) => state.cart);
  console.log(cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userInfo} = useSelector((state) => state.auth);
  const [logutApiCall] = useLogoutMutation();


  const logoutHandler = async ()=>{
    try {
      await logutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
      
    } catch (error) {
      console.log(error); 
    }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
            <LinkContainer to='/'>
            <Navbar.Brand>
                <img src={logo} alt="ProShop"></img>
                ProShop</Navbar.Brand>
                </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">{/*ms auto to align in the collapse bar*/}

                <LinkContainer to='cart'><Nav.Link>
                  <FaShoppingCart/>&nbsp;Cart
                  {
                    cartItems.length > 0 && (<Badge pill bg='success' style={{marginLeft: '5px'}}>
                      {cartItems.reduce((a,c) => a + c.qty,0)}
                    </Badge>
                    
                    )
                  }
                  
                  </Nav.Link>
                  </LinkContainer>
                  {userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>logout</NavDropdown.Item>
                  </NavDropdown>): (  <LinkContainer to='/login'><Nav.Link><FaUser/>&nbsp;User</Nav.Link></LinkContainer>)}
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
