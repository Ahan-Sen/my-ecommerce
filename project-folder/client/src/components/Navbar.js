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
            <Link to="/cart" className="text-white">
              <i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
            </Link>
          </NavbarBrand>
        </NavItem>

        <NavItem className="pb-2">
          <NavLink href="#!" onClick={onLogout}>
            <h5>
              Logout <i class="fa fa-sign-out" aria-hidden="true"></i>
            </h5>
          </NavLink>
        </NavItem>
        <NavItem>
          <Link to="/orderhistory">My Orders</Link>
        </NavItem>
      </Nav>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <Nav className="row" navbar>
        <NavItem>
          <NavLink href="/cart">
            <i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
          </NavLink>
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
        <div className="col-6">
          <NavbarBrand className="mr-3">
            <Link className="text-decoration-none" to="/">
              <h2 className="text-white">SHOPPING</h2>
            </Link>
          </NavbarBrand>
        </div>
        <div className="col-5">
          <ul className="d-flex justify-content-end">
            {users.userAuth ? userLinks : authLinks}
          </ul>
        </div>

        {/* <Link to="/cart">Cart</Link> */}
      </Navbar>
    </>
  );
};

export default Header;
