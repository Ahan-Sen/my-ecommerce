import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  getCart,
  getAddress,
  removeFromCart,
} from "../redux/cart/cartActions";
import { getUser } from "../redux/auth/authActions";
import { orderReset } from "../redux/order/orderActions";

export default function Cart(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
    dispatch(getAddress());
    dispatch(orderReset());
  }, []);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/address");
  };
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Cart
          </li>
        </ol>
      </nav>
      {cart.loading ? (
        <div>LOADING...</div>
      ) : cart.errors ? (
        <div>{cart.errors}</div>
      ) : (
        <div className="row ml-0 mr-0">
          <div className="col-12 col-md-8">
            <h1>Shopping Cart</h1>
            {cart.cart.length === 0 ? (
              <div>
                Cart is empty. <Link to="/">Go Shopping</Link>
              </div>
            ) : (
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
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.cart._id, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.cart.countInStock).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div>${item.cart.price}</div>
                      <div>
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={() => removeFromCartHandler(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className=" col-12 col-md-4 ">
            <div className="card card-body  bg-light">
              <ul className="list-unstyled">
                <li>
                  <h2>
                    Subtotal ({cart.cart.reduce((a, c) => a + c.qty, 0)} items)
                    : ${cart.cart.reduce((a, c) => a + c.cart.price * c.qty, 0)}
                  </h2>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={checkoutHandler}
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
      )}
    </div>
  );
}
