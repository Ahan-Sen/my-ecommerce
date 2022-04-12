import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError, getUser } from "../redux/auth/authActions";

export const Login = (props) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (users.userAuth) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, users.userAuth]);

  const [user, setUser] = useState({ email: "", password: "" });
  const { email, password } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    dispatch(clearError());
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    dispatch(clearError());
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6  mx-auto pt-4 pb-4 ">
            <h3 className="login-heading mb-4">Welcome back!</h3>

            <form onSubmit={submit}>
              <div className="form-group mb-1 mt-0">
                <label className="mb-0 mt-1 text-secondary small" for="email">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email address"
                  value={email}
                  onChange={handleChange}
                  autofocus
                />
              </div>

              <div className="form-group mb-1 mt-0">
                <label
                  className="text-secondary mb-0 mt-1 small"
                  for="inputPassword"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                  className="form-control rounded"
                />
              </div>

              <div className="custom-control custom-checkbox  mb-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label mt-2" for="customCheck1">
                  Remember password
                </label>
              </div>
              <button
                className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                type="submit"
                value="sign In"
              >
                Sign in
              </button>
              <div>
                {users.errors !== null && (
                  <div className="alert alert-danger text-center" role="alert">
                    {users.errors.msg
                      ? users.errors.msg
                      : users.errors.error[0].msg}
                    <button
                      className="btn text-right"
                      onClick={() => dispatch(clearError())}
                    >
                      X
                    </button>
                  </div>
                )}
              </div>
              <div className="text-center">
                <a className="small" href="#">
                  Forgot password?
                </a>
              </div>
            </form>
            <div className="text-center">
              <p>
                New customer?{" "}
                <Link to={`/register?redirect=${redirect}`}>
                  {" "}
                  Create your account{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
