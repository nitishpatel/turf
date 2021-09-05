import React, { useState } from "react";
import { Col, Container } from "reactstrap";
import { isAuthenticated } from "../auth/helper";
import { createVendor } from "./helper/vendorapicalls";
const SetupVendor = () => {
  var { token, user } = isAuthenticated();

  const [state, setState] = useState({
    userid: "",
    name: "",
    typeOfEntity: "",
    vendorCIN: "",
    registrationAddress: "",
    email: "",
    phone: "",
    panNumber: "",
    gstin: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    isVerified: false,
    success: false,
    error: "",
  });
  const handleChange = (name) => (event) => {
    setState({ ...state, error: false, [name]: event.target.value });
  };
  const {
    name,
    typeOfEntity,
    vendorCIN,
    registrationAddress,
    email,
    phone,
    panNumber,
    gstin,
    ownerName,
    ownerEmail,
    ownerPhone,
    isVerified,
  } = state;
  const onSubmit = (event) => {
    event.preventDefault();

    setState({ ...state, error: false });

    createVendor(
      {
        user: user["id"],
        name: name,
        typeOfEntity: typeOfEntity,
        vendorCIN: vendorCIN,
        registrationAddress: registrationAddress,
        email: email,
        phone: phone,
        panNumber: panNumber,
        gstin: gstin,
        ownerName: ownerName,
        ownerEmail: ownerEmail,
        ownerPhone: ownerPhone,
        isVerified: isVerified,
      },
      token
    )
      .then((data) => {
        if (data.email === email) {
          setState({
            userid: "",
            name: "",
            typeOfEntity: "",
            vendorCIN: "",
            registrationAddress: "",
            email: "",
            phone: "",
            panNumber: "",
            gstin: "",
            ownerName: "",
            ownerEmail: "",
            ownerPhone: "",
            isVerified: false,
            success: false,
            error: "",
          });
        } else {
          setState({
            ...state,
            error: true,
            success: false,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const setupForm = () => {
    return (
      <div className=" text-left">
        <form className="row">
          <Col md="6">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={handleChange("name")}
              />
            </div>
          </Col>

          <Col md="6">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label>Type Of Entity</label>
              <input
                type="text"
                className="form-control"
                value={typeOfEntity}
                onChange={handleChange("typeOfEntity")}
              />
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label>Vendor CIN</label>
              <input
                type="text"
                className="form-control"
                value={vendorCIN}
                onChange={handleChange("vendorCIN")}
              />
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label>Registration Address</label>
              <input
                type="text"
                className="form-control"
                value={registrationAddress}
                onChange={handleChange("registrationAddress")}
              />
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={handleChange("phone")}
              />
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label>PAN</label>
              <input
                type="text"
                className="form-control"
                value={panNumber}
                onChange={handleChange("panNumber")}
              />
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label>GSTIN</label>
              <input
                type="text"
                className="form-control"
                value={gstin}
                onChange={handleChange("gstin")}
              />
            </div>
          </Col>
          <Col md="4">
            <div className="form-group">
              <label>Owner Name</label>
              <input
                type="text"
                className="form-control"
                value={ownerName}
                onChange={handleChange("ownerName")}
              />
            </div>
          </Col>
          <Col md="4">
            <div className="form-group">
              <label>Owner Email</label>
              <input
                type="email"
                className="form-control"
                value={ownerEmail}
                onChange={handleChange("ownerEmail")}
              />
            </div>
          </Col>
          <Col md="4">
            <div className="form-group">
              <label>Owner Phone</label>
              <input
                type="text"
                className="form-control"
                value={ownerPhone}
                onChange={handleChange("ownerPhone")}
              />
            </div>
          </Col>

          <Col className="text-center px-5 py-4" md="12">
            <button
              onClick={onSubmit}
              className="btn btn-block btn-primary text-light"
            >
              Submit
            </button>
          </Col>
        </form>
      </div>
    );
  };
  return (
    <div>
      <div className="header bg-gradient-info py-7 py-lg-8">
        <h1 className="text-center h1">Setup</h1>
      </div>
      {state.error && (
        <div className="alert alert-danger">Please check all the fields!</div>
      )}
      <Container>{setupForm()}</Container>
    </div>
  );
};

export default SetupVendor;
