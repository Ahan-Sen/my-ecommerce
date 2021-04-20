import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, getCart, getAddress } from "../redux/cart/cartActions";
import { getUser } from "../redux/auth/authActions";

export default function Cart(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // const removeFromCartHandler = (id) => {
  //   dispatch(removeFromCart(id));
  // };
  useEffect(() => {
    dispatch(getCart());
    dispatch(getAddress());
  }, []);

  const checkoutHandler = () => {
    props.history.push("/address");
  };
  return (
    <div>
      {cart.loading ? (
        <div>LOADING...</div>
      ) : (
        <div className="row ml-0 mr-0">
          <div className="col-12 col-md-7">
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
                        <button type="button" class="btn btn-danger">
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className=" col-12 col-md-5 ">
            <div className="card card-body margin bg-light">
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
