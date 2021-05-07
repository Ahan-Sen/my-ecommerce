import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Rating from "../components/Rating";
import { detailsProduct } from "../redux/product/productActions";
import { addToCart, NotAdded } from "../redux/cart/cartActions";
import { getUser } from "../redux/auth/authActions";
import { Link } from "react-router-dom";

function Product(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const users = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(detailsProduct(productId));
    dispatch(NotAdded());
  }, [dispatch, productId]);

  useEffect(() => {
    {
      users.userAuth && users.user == null && dispatch(getUser());
    }
  }, []);
  useEffect(() => {
    {
      cart.success &&
        setTimeout(() => {
          dispatch(NotAdded());
        }, 3000);
    }
  }, [cart.success]);

  const addToCartHandler = () => {
    if (users.userAuth) {
      dispatch(addToCart(productId, qty));
    } else {
      props.history.push(`/login?redirect=/product/${productId}`);
    }
  };

  return (
    <div>
      {loading ? (
        <div>LOADING...</div>
      ) : (
        <div>
          <Link to="/">Back to Result</Link>
          <div className="row ml-0 mr-0">
            <div className=" col-5">
              <img src={product.image} alt={product.name}></img>
            </div>
            <div className=" col-12 col-lg-3">
              <ul className="list-unstyled">
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  {" "}
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </li>
                <li>Price : ${product.price}</li>
                <li>
                  {" "}
                  Description: <p> {product.description}</p>
                </li>
              </ul>
            </div>
            <div className=" col-12 col-lg-4">
              <div className="card card-body pb-0">
                <ul className="list-unstyled">
                  <li>
                    <div className="row justify-content-between">
                      <div>Price</div>
                      <div className="font-weight-bold">${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row justify-content-between mt-2">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="text-success font-weight-bold">
                            In Stock
                          </span>
                        ) : (
                          <span className="text-danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row justify-content-between mt-2 mb-2">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="btn btn-primary btn-lg btn-block mt-4"
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              {cart.success && (
                <div
                  class="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  <strong>Item added to your cart</strong>

                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={() => dispatch(NotAdded())}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
              {cart.errors && (
                <div
                  class="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <strong>Item Cannot be added to your cart.</strong>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={() => dispatch(NotAdded())}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
