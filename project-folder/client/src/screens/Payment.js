import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Payment() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cart.reduce((a, c) => a + c.cart.price * c.qty, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  return (
    <div className="mt-5">
      <div className="row ml-0 mr-0 ">
        <div className="col-7">
          <ul className="list-unstyled">
            <li>
              <div className="card card-body bg-light  mb-5">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {cart.address.fullName} <br />
                  <strong>Address: </strong> {cart.address.houseNumber},
                  {cart.address.city}, {cart.address.postalCode},
                  {cart.address.country}
                </p>
              </div>
            </li>

            <li>
              <div className="card card-body bg-light">
                <h2>Order Items</h2>

                <ul className="list-unstyled mt-5">
                  {cart.cart.map((item) => (
                    <li key={item.product}>
                      <div className="row justify-content-between mt-4 mb-4 ">
                        <div>
                          <img
                            src={item.cart.image}
                            alt={item.cart.name}
                            height="100px"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.cart._id}`}>
                            {item.cart.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} X ${item.cart.price} = $
                          {item.qty * item.cart.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className=" offset-1 col-4">
          <div className="card card-body bg-light">
            <ul className="list-unstyled">
              <li>
                <div className="row mb-3">
                  <div className="offset-3">
                    <h2>Order Summary</h2>
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-4">Items Total : </div>
                  <div className="col-6">${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-4">Shipping</div>
                  <div className="col-6">${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-4">Tax : </div>
                  <div className="col-6">${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-4">
                    <strong> Order Total : </strong>
                  </div>
                  <div className="col-6">
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  //onClick={checkoutHandler}
                  className="btn btn-primary btn-lg btn-block mt-4"
                  disabled={cart.cart.length === 0}
                >
                  Proceed to Checkout
                </button>
              </li>
              {/* {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>} */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
