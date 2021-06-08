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
import { getUser } from "../redux/auth/authActions";
import { getCart } from "../redux/cart/cartActions";

const Header = (props) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const onLogout = () => {
    dispatch(logout());
    dispatch(clearError());
  };

  useEffect(() => {
    if (localStorage.token) {
      dispatch(getUser());
      dispatch(getCart());
    }
  }, [users.userAuth]);

  const userLinks = (
    <Fragment>
      <Nav navbar className="d-flex flex-row " style={{ marginRight: "60px" }}>
        <NavItem>
          <Link to="/cart" className="text-white">
            <i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
            {cart.cart.length > 0 && (
              <span className="badge">{cart.cart.length}</span>
            )}
          </Link>
        </NavItem>
        <NavItem>
          <div class="dropdown">
            <h5 className="text-white ml-4">
              {users.user && users.user.name}{" "}
              <i class="fa fa-caret-down" aria-hidden="true"></i>
            </h5>
            <div class="dropdown-content">
              <Link to="/orderhistory">My Orders</Link>
              <Link to="#!" onClick={onLogout}>
                Logout <i class="fa fa-sign-out" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </NavItem>
      </Nav>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <Nav navbar className="d-flex flex-row ">
        <NavItem>
          <Link to="/cart" className="text-white">
            <i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <h5 className="text-white ml-4">Login</h5>
          </Link>
        </NavItem>
      </Nav>
    </Fragment>
  );

  return (
    <div className="navsize">
      <Navbar dark expand="md" className="bg-dark ">
        <div className="col-12 col-md-6 text-center text-lg-left ">
          <NavbarBrand className="mr-3">
            <Link className="text-decoration-none" to="/">
              <h1 className="text-white">SHOPPING</h1>
            </Link>
          </NavbarBrand>
        </div>
        <div className=" col-12 col-md-6">
          <ul className="d-flex  justify-content-center justify-content-lg-end pl-0">
            {users.userAuth ? userLinks : authLinks}
          </ul>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
