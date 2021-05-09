import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  saveShippingAddress,
  getAddress,
  getCart,
} from "../redux/cart/cartActions";

export const AddAddress = (props) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const [address, setAddress] = useState({
    fullName: "",
    houseNumber: "",
    city: "",
    postalcode: null,
    country: "",
  });
  const { fullName, houseNumber, city, postalcode, country } = address;

  useEffect(() => {
    setAddress({
      ...address,
      fullName: cart.address.fullName,
      houseNumber: cart.address.houseNumber,
      city: cart.address.city,
      postalcode: cart.address.postalcode,
      country: cart.address.country,
    });
  }, []);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(address));
    props.history.push("/checkout");
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <Link to="/cart">Cart</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Address
          </li>
        </ol>
      </nav>
      {cart.loading ? (
        <div>LOADING...</div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-6  mx-auto pt-4 pb-4  m-3">
              <h3 className="login-heading mb-4">Add Shipping Address</h3>
              <form onSubmit={submit}>
                <div className="form-group mb-1 mt-0">
                  <label className="mb-0 mt-1 text-secondary small" for="email">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder=" Full Name"
                    value={fullName}
                    onChange={handleChange}
                    className="form-control"
                    autofocus
                    required
                  />
                </div>
                <div className="form-group mb-1 mt-0">
                  <label
                    className="mb-0 mt-1 text-secondary small"
                    for="houseNumber"
                  >
                    House No.
                  </label>
                  <input
                    type="text"
                    name="houseNumber"
                    className="form-control"
                    placeholder="House Number"
                    value={houseNumber}
                    onChange={handleChange}
                    autofocus
                    required
                  />
                </div>

                <div className="form-group mb-1 mt-0">
                  <label className="mb-0 mt-1 text-secondary small" for="city">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={city}
                    onChange={handleChange}
                    className="form-control rounded"
                    required
                  />
                </div>
                <div className="form-group mb-2 mt-0">
                  <label
                    className="mb-0 mt-1 text-secondary small"
                    for="postalcode"
                  >
                    Postal-Code
                  </label>
                  <input
                    type="text"
                    name="postalcode"
                    placeholder="Postal-Code"
                    value={postalcode}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mb-2 mt-0">
                  <label
                    className="mb-0 mt-1 text-secondary small"
                    for="country"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={country}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <button
                  className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2 mt-4"
                  type="submit"
                  value="Add-address"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAddress;
