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
    <div>
      {myorders.loading ? (
        <div>LOADING...</div>
      ) : (
        <div>
          <table class="table table-striped  ">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Date</th>
                <th scope="col">Total</th>
                <th scope="col">Paid</th>
                <th scope="col">Deliverd</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {myorders.order.map((order) => (
                <tr>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
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
        </div>
      )}
    </div>
  );
}

export default MyOrders;
