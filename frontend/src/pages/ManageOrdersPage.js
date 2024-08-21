import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';

function ManageOrdersPage(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }
  return loading ? <div>Loading...</div> :
    <div className="content content-margined">

      <div className="order-header">
        <h3>View all orders:</h3>
      </div>
      <div className="order-list">

        <table className="table">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>ORDER DATE</th>
              <th>USER ID</th>
              <th>ORDER TOTAL</th>
              <th>PAID?</th>
              <th>ORDER STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (<tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt}</td>
              <td>{order.user.name}</td>
              <td>{order.totalPrice}</td>
              <td>{order.isPaid.toString()}</td>
              <td>{order.isDelivered.toString()}</td>
              <td>
                <Link to={"/order/" + order._id} className="button secondary" >View Details</Link>
                {' '}
                <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Remove Order</button>
              </td>
            </tr>))}
          </tbody>
        </table>

      </div>
    </div>
}
export default ManageOrdersPage;