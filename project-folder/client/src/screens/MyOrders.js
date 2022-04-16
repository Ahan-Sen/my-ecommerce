import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { myOrders } from "../redux/order/orderActions";

function MyOrders(props) {
  const dispatch = useDispatch();
  const myorders = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);
  return (
    <>
      {myorders.loading ? (
        <div>LOADING...</div>
      ) : myorders.error ? (
        <div>{myorders.error}</div>
      ) : (
        <>
          <table class="table table-striped  ">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Date</th>
                <th scope="col">Total</th>
                <th scope="col">Paid</th>
                <th scope="col">Delivered</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {myorders.order.map((order) => (
                <tr>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString('en-GB')}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? new Date(order.paidAt).toLocaleDateString('en-GB'): "No"}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default MyOrders;
