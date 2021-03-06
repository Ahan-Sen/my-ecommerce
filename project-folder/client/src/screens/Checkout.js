import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../redux/order/orderActions";
import { emptyCart } from "../redux/cart/cartActions";

export default function Checkout(props) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);

  useEffect(() => {
    if (order.success) {
      props.history.push(`/order/${order.order._id}`);
    }
  }, [order, props.history, order.success]);

  const placeOrderHandler = () => {
    dispatch(createOrder(cart));
    dispatch(emptyCart());
  };

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cart.reduce((a, c) => a + c.cart.price * c.qty, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

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
          <li class="breadcrumb-item">
            <Link to="/address">Address</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Order
          </li>
        </ol>
      </nav>

      <div className="mt-5">
        <div className="row ml-0 mr-0 ">
          <div className="col-12 col-lg-8">
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
                          <div className="col-6 col-md-4">
                            <img
                              src={item.cart.image}
                              alt={item.cart.name}
                              height="100px"
                            ></img>
                          </div>
                          <div className="col-6 ">
                            <div className="">
                              <Link to={`/product/${item.cart._id}`}>
                                {item.cart.name}
                              </Link>
                            </div>
                            <div className="">
                              {item.qty} X ???{item.cart.price} = ???
                              {item.qty * item.cart.price}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className=" col-12 col-lg-4">
            <div className="card card-body bg-light">
              <ul className="list-unstyled">
                <li>
                  <div className="row mb-3 justify-content-center">
                    <h2>Order Summary</h2>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-5">Items Total : </div>
                    <div className="col-6">???{cart.itemsPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-5">Shipping</div>
                    <div className="col-6">
                      ???{cart.shippingPrice.toFixed(2)}
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-5">Tax : </div>
                    <div className="col-6">???{cart.taxPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-5">
                      <strong> Order Total : </strong>
                    </div>
                    <div className="col-6">
                      <strong>???{cart.totalPrice.toFixed(2)}</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={placeOrderHandler}
                    className="btn btn-primary btn-lg btn-block mt-4"
                    disabled={cart.cart.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
