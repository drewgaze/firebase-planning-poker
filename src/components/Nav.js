import React, { Component } from "react";
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
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "config/firebase";

class Navigation extends Component {
  state = {
    isOpen: false
  };
  toggle = () =>
    this.setState({
      isOpen: !this.state.isOpen
    });
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Link} to="/">
          Planning Poker
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isLoggedIn && (
              <NavItem>
                <NavLink tag={Link} to="/new">
                  New Game
                </NavLink>
              </NavItem>
            )}
            {isLoggedIn ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {firebase.auth().currentUser.displayName}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => firebase.auth().signOut()}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <NavItem>
                <NavLink tag={Link} to="/login">
                  Login
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = ({ user: { isLoggedIn, user } }) => ({ user, isLoggedIn });

export default connect(mapStateToProps)(Navigation);
