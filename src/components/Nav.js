import React, { useState, useCallback } from "react";
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
import firebase from "config/firebase";
import useFirebaseAuth from "hooks/useFirebaseAuth";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useFirebaseAuth();
  const toggle = useCallback(() => setIsOpen(!isOpen));

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">
        Planning Poker
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {user && (
            <NavItem>
              <NavLink tag={Link} to="/new">
                New Game
              </NavLink>
            </NavItem>
          )}
          {user ? (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {user.displayName}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => firebase.auth().signOut()}>
                  Logout
                </DropdownItem>
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
};

export { Navigation as default };
