import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";
import {
  signin,
  authenticate,
  isAuthenticated,
  isVendor,
  isAdmin,
} from "../auth/helper";
import Logo from "../Logo.png";
const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
  });

  const { email, password, error, success, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    signin({ email, password })
      .then((data) => {
        console.log("DATA", data);
        if (data.token) {
          //let sessionToken = data.token;
          authenticate(data, () => {
            console.log("TOKKEN ADDED");
            setValues({
              ...values,
            });
          });
        } else {
          setValues({
            ...values,
            loading: false,
            error: data.error,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      if (isAdmin()) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        if (isVendor) {
          return <Redirect to="/vendor/dashboard" />;
        } else {
          return <Redirect to="/user/dashboard" />;
        }
      }
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account created successfully. Please{" "}
            <Link to="/signin">login now.</Link>
          </div>
        </div>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div
        style={{ display: error ? "" : "none" }}
        class="app-card alert alert-dismissible shadow-sm mb-4 border-left-decoration"
        role="alert"
      >
        <div class="inner">
          <div class="app-card-body ">
            <h3 class="mb-3">Error Occured!</h3>
            <div class="row">
              <div class="col-12 col-lg-9">
                <div>{error}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="app app-login p-0">
      <div className="row g-0 app-auth-wrapper">
        <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
          <div className="d-flex flex-column align-content-end">
            <div className="app-auth-body mx-auto">
              <div className="app-auth-branding mb-4">
                <a className="app-logo" href="index.html">
                  <img className="logo-icon me-2" src={Logo} alt="logo" />
                </a>
              </div>
              <h2 className="auth-heading text-center mb-5">
                Log in to MyGrounds
              </h2>
              {errorMessage()}
              <div className="auth-form-container text-start">
                <form className="auth-form login-form">
                  <div className="email mb-3">
                    <label className="sr-only" for="signin-email">
                      Email
                    </label>
                    <input
                      id="signin-email"
                      name="signin-email"
                      type="email"
                      onChange={handleChange("email")}
                      className="form-control signin-email"
                      placeholder="Email address"
                      required="required"
                    />
                  </div>
                  <div className="password mb-3">
                    <label className="sr-only" for="signin-password">
                      Password
                    </label>
                    <input
                      id="signin-password"
                      name="signin-password"
                      type="password"
                      onChange={handleChange("password")}
                      className="form-control signin-password"
                      placeholder="Password"
                      required="required"
                    />
                    <div className="extra mt-3 row justify-content-between">
                      <div className="col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="RememberPassword"
                          />
                          <label
                            className="form-check-label"
                            for="RememberPassword"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="forgot-password text-end">
                          <a href="reset-password.html">Forgot password?</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      onClick={onSubmit}
                      className="btn app-btn-primary w-100 theme-btn mx-auto"
                    >
                      Log In
                    </button>
                  </div>
                </form>

                <div className="auth-option text-center pt-5">
                  No Account? Sign up{" "}
                  <a className="text-link" href="signup.html">
                    here
                  </a>
                  .
                </div>
              </div>
            </div>

            <footer className="app-auth-footer">
              <div className="container text-center py-3">
                <small className="copyright">Developed By Nitish Patel</small>
              </div>
            </footer>
          </div>
        </div>
        <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
          <div className="auth-background-holder"></div>
          <div className="auth-background-mask"></div>
          <div className="auth-background-overlay p-3 p-lg-5">
            <div className="d-flex flex-column align-content-end h-100">
              <div className="h-100"></div>
            </div>
          </div>
        </div>
      </div>
      {performRedirect()}
    </div>
  );
};
export default Signin;
