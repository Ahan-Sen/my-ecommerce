import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import Product from "./screens/Product";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Cart from "./screens/Cart";
import Payment from "./screens/Payment";
import AddAddress from "./screens/Address";

import Header from "./components/Navbar";
//import PrivateRoute from "../src/pages/routes/PrivateRoute";
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
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/address" component={AddAddress} />
        <Route exact path="/payment" component={Payment} />
      </Switch>
    </Router>
  );
}

export default App;
