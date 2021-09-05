import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Navbar from "../components/Navbar";
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
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={handleChange("name")}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={handleChange("email")}
            />
          </div>
          <div className="form-group">
            <label>Type Of Entity</label>
            <input
              type="text"
              className="form-control"
              value={typeOfEntity}
              onChange={handleChange("typeOfEntity")}
            />
          </div>
          <div className="form-group">
            <label>Vendor CIN</label>
            <input
              type="text"
              className="form-control"
              value={vendorCIN}
              onChange={handleChange("vendorCIN")}
            />
          </div>
          <div className="form-group">
            <label>Registration Address</label>
            <input
              type="text"
              className="form-control"
              value={registrationAddress}
              onChange={handleChange("registrationAddress")}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={handleChange("phone")}
            />
          </div>
          <div className="form-group">
            <label>PAN</label>
            <input
              type="text"
              className="form-control"
              value={panNumber}
              onChange={handleChange("panNumber")}
            />
          </div>
          <div className="form-group">
            <label>GSTIN</label>
            <input
              type="text"
              className="form-control"
              value={gstin}
              onChange={handleChange("gstin")}
            />
          </div>
          <div className="form-group">
            <label>Owner Name</label>
            <input
              type="text"
              className="form-control"
              value={ownerName}
              onChange={handleChange("ownerName")}
            />
          </div>
          <div className="form-group">
            <label>Owner Email</label>
            <input
              type="email"
              className="form-control"
              value={ownerEmail}
              onChange={handleChange("ownerEmail")}
            />
          </div>
          <div className="form-group">
            <label>Owner Phone</label>
            <input
              type="text"
              className="form-control"
              value={ownerPhone}
              onChange={handleChange("ownerPhone")}
            />
          </div>

          <button
            onClick={onSubmit}
            className="btn btn-block theme-red text-light"
          >
            Submit
          </button>
        </form>
      </div>
    );
  };
  return (
    <div>
      <Navbar />
      <div className="col-lg-6 offset-lg-3">
        <h1>Setup</h1>
        {setupForm()}
      </div>
    </div>
  );
};

export default SetupVendor;
