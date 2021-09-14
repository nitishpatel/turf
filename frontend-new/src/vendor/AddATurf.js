import { isAuthenticated } from "auth/helper";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Col, Form, FormGroup, Input, Label } from "reactstrap";
import {
  createTurf,
  getVendor,
  getVendorFromLocalStorage,
} from "./helper/vendorapicalls";
const AddATurf = () => {
  var { token, user } = isAuthenticated();
  const [state, setState] = useState();
  const vendor = getVendorFromLocalStorage();
  useEffect(() => {
    getAVendor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getAVendor = () => {
    if (!vendor || !vendor["isVerified"]) {
      return Swal.fire("Problem!", "Set up vendor account!", "error").then(
        () => {
          window.location = "/vendor/dashboard";
        }
      );
    }
    return getVendor(user["id"])
      .then((data) => {
        if (data.length === 0) {
          window.location = "/vendor/setup";
        } else {
          console.log("STAY");
          setState(data[0]);
        }
      })
      .then((err) => console.log(err));
  };
  const [formData, setFormData] = useState({
    vendorId: null,
    name: "",
    location: "",
    rules: "",
    description: "",
    amenities: "",
    city: "",
    price: "",
    featured: false,
    active: false,
    success: false,
    error: false,
  });
  const handleChange = (name) => (event) => {
    setFormData({ ...formData, error: false, [name]: event.target.value });
  };
  const {
    name,
    location,
    rules,
    description,
    price,
    amenities,
    city,
    success,
    error,
  } = formData;
  const onSubmit = (event) => {
    event.preventDefault();

    createTurf(
      {
        vendorId: state.id,
        name: name,
        location: location,
        rules: rules,
        description: description,
        amenities: amenities,
        price: price,
        city: city,
        featured: true,
        active: true,
      },
      token
    )
      .then((data) => {
        console.log(data.id);
        if (data.id) {
          setFormData({
            vendorId: null,
            name: "",
            location: "",
            rules: "",
            price: "",
            description: "",
            amenities: "",
            city: "",
            featured: false,
            active: false,
            success: true,
            error: false,
          });
        } else {
          setFormData({
            ...state,
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
            Turf added successfully
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
      <div className="text-left">
        <Form className="row">
          <Col md="6">
            <FormGroup>
              <Label for="name">Name</Label>
              <Input onChange={handleChange("name")} name="name" value={name} />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="name">Location</Label>
              <Input
                onChange={handleChange("location")}
                name="location"
                value={location}
              />
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <Label for="exampleText">Rules</Label>
              <Input
                type="textarea"
                name="rules"
                onChange={handleChange("rules")}
                value={rules}
              />
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <Label for="exampleText">Description</Label>
              <Input
                name="description"
                type="textarea"
                onChange={handleChange("description")}
                value={description}
              />
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <Label for="exampleText">Amenities</Label>
              <Input
                type="textarea"
                name="amenities"
                onChange={handleChange("amenities")}
                value={amenities}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="exampleText">City</Label>
              <Input
                type="text"
                name="city"
                onChange={handleChange("city")}
                value={city}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="exampleText">Price</Label>
              <Input
                type="number"
                name="price"
                onChange={handleChange("price")}
                value={price}
              />
            </FormGroup>
          </Col>

          <Col md="12">
            <button
              onClick={onSubmit}
              className="btn btn-block btn-primary text-light"
            >
              Submit
            </button>
          </Col>
        </Form>
      </div>
    );
  };
  return (
    <div className="container-fluid">
      <div className="col-lg-12 align-self-center p-4">Add a Turf</div>
      {successMessage()}
      {errorMessage()}
      {setupForm()}
    </div>
  );
};

export default AddATurf;
