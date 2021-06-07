import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder, orderReset } from "../redux/order/orderActions";
import StripeContainer from "../components/StripeContainer";
import axios from "axios";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

export default function Order(props) {
  const orderId = props.match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId, orderDetails.paySuccess]);
  useEffect(() => {
    orderDetails.paySuccess && setShow(true);
  }, [orderDetails.paySuccess]);

  const [showItem, setShowItem] = useState(false);
  const [show, setShow] = useState(false);

  const toggleModal = () => {
    setShow(!show);
  };

  return (
    <div>
      {orderDetails.loading ? (
        <div>LOADING...</div>
      ) : orderDetails.error ? (
        <div>{orderDetails.error}</div>
      ) : (
        <div>
          <h5>Order {orderDetails.order._id}</h5>
          <div className="row mt-5  ml-0 mr-0">
            <div className=" col-12 col-lg-8">
              <ul className="pl-0">
                <li className="list-unstyled ">
                  <div className="card card-body bg-light">
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name:</strong>{" "}
                      {orderDetails.order.address.fullName} <br />
                      <strong>Address: </strong>{" "}
                      {orderDetails.order.address.houseNumber},
                      {orderDetails.order.address.city},{" "}
                      {orderDetails.order.address.postalCode},
                      {orderDetails.order.address.country}
                    </p>
                    {orderDetails.order.isDelivered ? (
                      <div className="alert alert-success">
                        Delivered at {orderDetails.order.deliveredAt}
                      </div>
                    ) : (
                      <div className="alert alert-danger">Not Delivered</div>
                    )}
                  </div>
                </li>
                <li className="list-unstyled mt-5">
                  <div className="card card-body bg-light">
                    <h2>Payment</h2>

                    {orderDetails.order.isPaid ? (
                      <div className="alert alert-success">
                        Paid at {orderDetails.order.paidAt.substring(0, 10)}
                      </div>
                    ) : (
                      <div className="alert alert-danger">Not Paid</div>
                    )}
                  </div>
                </li>
                <li className="list-unstyled mt-5">
                  <div className="card card-body bg-light">
                    <h2>Order Items</h2>
                    <ul className="list-unstyled">
                      {orderDetails.order.cart.map((item) => (
                        <li key={item.product}>
                          <div className="row justify-content-between mt-4 mb-4 ">
                            <div className="col-6 col-md-8">
                              <img
                                src={item.cart.image}
                                alt={item.cart.name}
                                height="100px"
                              ></img>
                            </div>
                            <div className="col-6 col-md-4">
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
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-4">
              <div className="card card-body bg-light">
                <ul className="list-unstyled mt-2">
                  <li>
                    <div className="row mb-3 justify-content-center">
                      <h2>Order Summary</h2>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div className="col-5">Items Total : </div>
                      <div className="col-6">
                        ${orderDetails.order.itemsPrice.toFixed(2)}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div className="col-5">Shipping</div>
                      <div className="col-6">
                        ${orderDetails.order.shippingPrice.toFixed(2)}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div className="col-5">Tax : </div>
                      <div className="col-6">
                        ${orderDetails.order.taxPrice.toFixed(2)}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div className="col-5">
                        <strong> Order Total : </strong>
                      </div>
                      <div className="col-6">
                        <strong>
                          ${orderDetails.order.totalPrice.toFixed(2)}
                        </strong>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              {!orderDetails.order.isPaid ? (
                showItem ? (
                  <StripeContainer />
                ) : (
                  <>
                    <button
                      className="btn btn-lg btn-block btn-warning"
                      onClick={() => setShowItem(true)}
                    >
                      {" "}
                      PAY NOW
                    </button>
                  </>
                )
              ) : (
                <div></div>
              )}
            </div>
          </div>

          <div>
            <Modal isOpen={show} toggle={toggleModal}>
              <ModalHeader className="justify-content-center">
                <h2 className="text-success text-center">Thank You</h2>
              </ModalHeader>
              <ModalBody>
                <p className="text-center">
                  Your Order has been successfully Placed
                </p>
                <button
                  className="btn btn-md btn-success btn-block"
                  onClick={toggleModal}
                >
                  OK
                </button>
              </ModalBody>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}
