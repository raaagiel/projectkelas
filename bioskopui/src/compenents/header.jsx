import React, { useState } from 'react';
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
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import color from '@material-ui/core/colors/lime';
import { LogoutActions } from './../redux/actions/AuthActions'
import { Icon } from 'semantic-ui-react'

const Logoutbtn = () => {
  localStorage.removeItem('dino')
  this.props.LogoutActions()
}

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand="md" style={{ height: '100px', backgroundColor: '#110133' }}>
        <NavbarBrand style={{ color: '#fff' }} href="/">Bioskop Trans7</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {props.namauser === '' ?
              <NavItem>
                <NavLink style={{ color: '#fff' }} href={'/login'}><Icon name='user circle' />Login</NavLink>
              </NavItem>
              :
              null
            }

            {
              props.namauser === '' ? null : props.role === 'admin' ? (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret style={{ color: '#fff' }}>
                    <Icon name='user circle' size='large' className='mr-2' />Hai, {props.namauser}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href='/manageadmin'>Manage Admin</DropdownItem>
                    <DropdownItem href={'/'} onClick={Logoutbtn}>Logout </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )
                :
                props.role === 'user' ? (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret style={{ color: '#fff' }}>
                      <Icon name='user circle' size='large' className='mr-2' />Hai, {props.namauser}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href='/'>Manage User</DropdownItem>
                      <DropdownItem href={'/'} onClick={Logoutbtn}>Logout </DropdownItem>
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
    role: state.Auth.role
  }
}
export default connect(MapstateToprops, { LogoutActions })(Header);