import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ViewProductDetailsPage from './pages/ViewProductDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import { useSelector } from 'react-redux';
import CreateAccountPage from './pages/CreateAccountPage';
import ManageProductsPage from './pages/ManageProductsPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import MakePaymentPage from './pages/MakePaymentPage';
import CustomerAccountDetailsPage from './pages/CustomerAccountDetailsPage';
import ManageOrdersPage from './pages/ManageOrdersPage';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <Link to="/">CROCHETELLA</Link>
          </div>
          <div className="header-links">
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            <a href="cart.html">Cart</a>
            {userInfo && userInfo.isAdmin && (
                <Link to="/orders">Orders</Link>
            )}
            {userInfo && userInfo.isAdmin && (
                <Link to="/products">Products</Link>
            )}
          </div>
        </header>
        <main className="main">
          <div className="content">
            <Route path="/orders" component={ManageOrdersPage} />
            <Route path="/profile" component={CustomerAccountDetailsPage} />
            <Route path="/order/:id" component={MakePaymentPage} />
            <Route path="/products" component={ManageProductsPage} />
            <Route path="/shipping" component={ShippingPage} />
            <Route path="/payment" component={PaymentPage} />
            <Route path="/placeorder" component={PlaceOrderPage} />
            <Route path="/signin" component={LoginPage} />
            <Route path="/register" component={CreateAccountPage} />
            <Route path="/product/:id" component={ViewProductDetailsPage} />
            <Route path="/cart/:id?" component={CartPage} />
            <Route path="/category/:id" component={HomePage} />
            <Route path="/" exact={true} component={HomePage} />
          </div>
        </main>
        <footer className="footer">Copyright &copy; 2021 Crochetella. All Rights Reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
