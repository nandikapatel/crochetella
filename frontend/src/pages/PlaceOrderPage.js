import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
function PlaceOrderPage(props) {

  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0.00 : 15.00;
  const taxPrice_unrounded = (0.13 * itemsPrice);
  const taxPrice = Math.round(taxPrice_unrounded * 100) / 100
  const totalPrice = (itemsPrice + shippingPrice + taxPrice);
  

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    }));
  }
  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }

  }, [success]);

  return <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Please verify the following shipping/billing address:
          </h3>
          <div>
            {cart.shipping.address}, {cart.shipping.city}, {cart.shipping.country}, {cart.shipping.postalCode}
          </div>
        </div>
        <div>
          <h3>You are paying with:</h3>
          <div>
            {cart.payment.paymentMethod}
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                Your Cart:
          </h3>
              <div>
                Your subtotal:
          </div>
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  Your cart is currently empty!
          </div>
                :
                cartItems.map(item =>
                  <li>
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
        <ul>
          <li>
            <h3>Verify the following details:</h3>
          </li>
          <li>
            <div>Pre-Tax Subtotal: ${itemsPrice}</div>
          </li>
          <li>
            <div>Cost of Shipping: ${shippingPrice}</div>
          </li>
          <li>
            <div>13% Tax in Ontario: ${taxPrice}</div>
          </li>
          <li>
            <div>YOUR ORDER TOTAL: ${totalPrice}</div>
          </li>
          <li>
            <h1></h1>
          </li>
          <li>
            <button className="button primary full-width" onClick={placeOrderHandler} >Place Order</button>
          </li>
        </ul>



      </div>

    </div>
  </div>

}

export default PlaceOrderPage;