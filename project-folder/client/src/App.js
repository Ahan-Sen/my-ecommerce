import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import Navbar from "./components/Navbar";
import Home from "./screens/Home";
//import PrivateRoute from "../src/pages/routes/PrivateRoute";
import setToken from "../src/utils/setToken";
import "./App.css";

if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
