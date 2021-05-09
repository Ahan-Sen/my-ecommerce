import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Product from "./screens/Product";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Cart from "./screens/Cart";
import Order from "./screens/Order";
import Checkout from "./screens/Checkout";
import AddAddress from "./screens/Address";
import MyOrders from "./screens/MyOrders";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Navbar";
import setToken from "../src/utils/setToken";
import "./App.css";

if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/product/:id" component={Product} />
        <PrivateRoute path="/order/:id" component={Order} />
        <PrivateRoute exact path="/cart" component={Cart} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/address" component={AddAddress} />
        <PrivateRoute exact path="/checkout" component={Checkout} />
        <PrivateRoute exact path="/orderhistory" component={MyOrders} />
      </Switch>
    </Router>
  );
}

export default App;
