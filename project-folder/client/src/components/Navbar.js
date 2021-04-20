import React, { useState, Fragment, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarText,
  NavItem,
  NavLink,
  Collapse,
  NavbarToggler,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout, clearError } from "../redux/auth/authActions";
import { Link } from "react-router-dom";

const Header = (props) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);

  const onLogout = () => {
    dispatch(logout());
    dispatch(clearError());
  };

  const userLinks = (
    <Fragment>
      <Nav navbar>
        <NavItem>
          <NavbarBrand>
            <h5>Hello, {users.user && users.user.name}</h5>
          </NavbarBrand>
        </NavItem>
        <NavItem>
          <h4> | </h4>
        </NavItem>
        <NavItem className="pb-2">
          <NavLink href="#!" onClick={onLogout}>
            <h5>
              Logout <i class="fa fa-sign-out" aria-hidden="true"></i>
            </h5>
          </NavLink>
        </NavItem>
      </Nav>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <Nav className="row" navbar>
        <NavItem>
          <NavLink href="/register" className="pb-0">
            <h5>Register</h5>
          </NavLink>
        </NavItem>
        <NavItem>
          <h4> | </h4>
        </NavItem>
        <NavItem>
          <NavLink href="/login">
            <h5>Login</h5>
          </NavLink>
        </NavItem>
      </Nav>
    </Fragment>
  );

  return (
    <>
      <Navbar dark expand="md" className="bg-dark">
        <div className="container ">
          <NavbarBrand className="mr-3">
            <Link className="text-decoration-none" to="/">
              <h2 className="text-white">SHOPPING</h2>
            </Link>
          </NavbarBrand>
          <ul className="d-flex flex-row badge badge-dark">
            {users.userAuth ? userLinks : authLinks}
          </ul>
          <Link to="/cart">Cart</Link>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
