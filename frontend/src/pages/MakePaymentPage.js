import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
function MakePaymentPage(props) {

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successPay) {
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
    };
  }, [successPay]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  return loading ? <div>Loading ...</div> : error ? <div>{error}</div> :

    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>
              Shipping
          </h3>
            <div>
              {order.shipping.address}, {order.shipping.city}, {order.shipping.country}, {order.shipping.postalCode}
          </div>
            <div>
              {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>
              Payment Method: {order.payment.paymentMethod}
            </div>
            <div>
              {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
            </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>
                  Your Cart
          </h3>
                <div>
                  Your Subtotal
          </div>
              </li>
              {
                order.orderItems.length === 0 ?
                  <div>
                    Your cart is currently empty!
          </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
                      <div className="cart-image">
                        <img src={item.image} alt="product" />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>

                        </div>
                        <div>
                          Quantity Selected: {item.qty}
                        </div>
                      </div>
                      <div className="cart-price">
                        ${item.price} Per Item
                      </div>
                    </li>
                  )
              }
            </ul>
          </div>


        </div>
        <div className="placeorder-action">

        </div>
        <div className="placeorder-action">
          <ul>
          <li>
            <h3>Please verify the following details:</h3>
          </li>
          <li>
            <div>Pre-Tax Subtotal: ${order.itemsPrice}</div>
          </li>
          <li>
            <div>Cost of Shipping: ${order.shippingPrice}</div>
          </li>
          <li>
            <div>13% Tax in Ontario: ${order.taxPrice}</div>
          </li>
          <li>
            <div>YOUR ORDER TOTAL: ${order.totalPrice}</div>
          </li>
          <li>
            <h1></h1>
          </li>
          <li className="placeorder-actions-payment">
              {loadingPay && <div>Processing Payment, Please Wait</div>}
              {!order.isPaid &&
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              }
          </li>
        </ul>
      </div>
    </div>
  </div>

}

export default MakePaymentPage;