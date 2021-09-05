import React, { useState } from "react";
import { Link } from "react-router-dom";
import VendorNavbar from "./VendorNavbar";
const AddATurf = () => {
  const [state, setState] = useState({
    vendorId: "null",
    name: "",
    location: "",
    rules: "",
    description: "",
    amenities: "",
    city: "",
    featured: false,
    active: false,
    success: false,
    error: false,
  });
  const handleChange = (name) => (event) => {
    setState({ ...state, error: false, [name]: event.target.value });
  };
  const {
    vendorId,
    name,
    location,
    rules,
    description,
    amenities,
    city,
    featured,
    active,
    success,
    error,
  } = state;
  const onSubmit = (event) => {
    event.preventDefault();

    setState({ ...state, error: false });
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
            <label>Location</label>
            <input
              type="email"
              className="form-control"
              value={location}
              onChange={handleChange("email")}
            />
          </div>
          <div className="form-group">
            <label>Rules</label>
            <textarea
              type="text"
              className="form-control"
              value={rules}
              onChange={handleChange("rules")}
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
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <VendorNavbar />
        <div className="col py-3">
          <div className="row">
            <div className="col-lg-12 align-self-center p-4">Add a Turf</div>
            {setupForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddATurf;
