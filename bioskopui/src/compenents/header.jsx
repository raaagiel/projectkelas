import React, { useState } from 'react';
// import Axios from 'axios'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { connect } from 'react-redux'
import { LogoutActions } from './../redux/actions/AuthActions'
import { Icon } from 'semantic-ui-react'

// import { APIURL } from './../support/apiurl'
// import { Link } from 'react-router-dom'
// import color from '@material-ui/core/colors/lime';


const Logoutbtn = () => {
  localStorage.removeItem('dino')
  this.props.LogoutActions()
}

const Header = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // console.log('haloooo')
  // console.log(props.nama)

  return (
    <div>
      <Navbar expand="md" style={{ height: '100px', backgroundColor: '#DF1995' }}>
        <NavbarBrand style={{ color: '#fff' }} href="/">
          <Icon loading name='film' size='huge' /> KAMINGSUN
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>



          <Nav className="ml-auto" navbar>
            {props.namauser === '' ?
              <NavItem>
                <NavLink style={{ color: '#fff' }} href={'/login'} className='mr-5'><Icon name='user circle' size='large' />Login</NavLink>
              </NavItem>
              :
              null
            }

            {
              props.namauser === '' ? null : props.role === 'admin' ? (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret style={{ color: '#fff' }}>
                    <Icon name='user circle' size='large' className='mr-2' />hai, {props.namauser}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href='/manageadmin'>Manage Admin</DropdownItem>
                    <DropdownItem href='/managestudio'>Manage Studio</DropdownItem>
                    <DropdownItem href={'/'} onClick={Logoutbtn}>Logout </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )
                :
                props.role === 'user' ? (

                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret style={{ color: '#fff' }} className='mt-4'>
                      <Icon name='user circle' size='large' className='mr-2' />hai, {props.namauser}
                    </DropdownToggle>
                    <DropdownMenu right style={{ backgroundColor: 'instagram' }}>
                      <DropdownItem href='/cart'><Icon name='shopping cart' />Cart ({props.keranjang})</DropdownItem>
                      <DropdownItem href='/changepass' ><Icon name='vcard' />Manage User</DropdownItem>
                      <DropdownItem href='/history' ><Icon name='history' />History</DropdownItem>
                      <DropdownItem href={'/'} onClick={Logoutbtn}><Icon name='user outline' />Logout </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : null
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div >
  );
}
const MapstateToprops = (state) => {
  return {
    namauser: state.Auth.username,
    Auth: state.Auth.login,
    role: state.Auth.role,
    AuthLog: state.Auth.login,
    UserId: state.Auth.id,
    keranjang: state.Auth.keranjang
  }
}
export default connect(MapstateToprops, { LogoutActions })(Header);