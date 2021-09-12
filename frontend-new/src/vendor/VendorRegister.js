import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { signup } from "../auth/helper";
const VendorRegister = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    isVendor: true,
    is_active: true,
    success: false,
    error: "",
  });

  const { name, email, password, error, success, isVendor, is_active } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password, isVendor, is_active })
      .then((data) => {
        if (data.email === email) {
          setValues({
            name: "",
            email: "",
            password: "",
            error: "",
            isVendor: true,
            is_active: true,
            success: true,
          });
        } else {
          setValues({
            ...values,
            error: true,
            success: false,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account Created Successfully
            <Link to="/signin" class="alert-link">
              {" "}
              Please Login Here!!
            </Link>
          </div>
        </div>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Check All Fields Again
          </div>
        </div>
      </div>
    );
  };
  const signUpForm = () => {
    return (
      <div className="text-left">
        <form>
          <div className="form-group">
            <label className="text-dark">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={handleChange("name")}
            />
          </div>
          <div className="form-group">
            <label className="text-dark">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={handleChange("email")}
            />
          </div>
          <div className="form-group">
            <label className="text-dark">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={handleChange("password")}
            />
          </div>
          <button
            onClick={onSubmit}
            className="btn btn-block btn-primary text-center"
          >
            Submit
          </button>
        </form>
      </div>
    );
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader>
            <h3>Vendor Registraion</h3>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default VendorRegister;
