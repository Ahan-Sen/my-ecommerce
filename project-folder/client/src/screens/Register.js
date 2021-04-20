import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, setError, clearError } from "../redux/auth/authActions";

export const Register = (props) => {
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

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    dispatch(clearError());
  };

  const submit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setError({ msg: "password don't match" }));
    } else {
      dispatch(registerUser({ name, email, password }));
      dispatch(clearError());
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6  mx-auto pt-4 pb-4  m-3">
            <h3 className="login-heading mb-4">Create Account</h3>
            <form onSubmit={submit}>
              <div className="form-group mb-1 mt-0">
                <label className="mb-0 mt-1 text-secondary small" for="email">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={handleChange}
                  className="form-control"
                  autofocus
                />
              </div>
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
                  className="mb-0 mt-1 text-secondary small"
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
              <div className="form-group mb-2 mt-0">
                <label
                  className="mb-0 mt-1 text-secondary small"
                  for="inputPassword"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password2"
                  placeholder="Confirm Password"
                  value={password2}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <button
                className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2 mt-4"
                type="submit"
                value="sign Up"
              >
                Register
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
            </form>
            <div className="text-center">
              <p>
                Already have an account?{" "}
                <Link to={`/login?redirect=${redirect}`}>Sign-In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
