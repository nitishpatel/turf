import { isAuthenticated } from "auth/helper";
import moment from "moment";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
} from "reactstrap";
import Swal from "sweetalert2";
import { updateBookingStatus } from "../vendor/helper/vendorapicalls";
import { getBookingRequests } from "./helper/customerhelper";
import { API } from "backend";
const CustomerDashboard = () => {
  const { user, token } = isAuthenticated();
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    getBookingRequestByUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBookingRequestByUser = async () => {
    return getBookingRequests(user.id)
      .then((response) => {
        if (response) {
          setBookings(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePaymentSuccess = async (response, bookingID) => {
    try {
      let bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));

      await Axios({
        url: `${API}orders/payment/success/`,
        method: "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          console.log("Everything is OK!");
          Swal.fire({
            position: "top-end",
            html: "<p>Booking Has Been Confirmed!</p>",
            showConfirmButton: false,
            timer: 1500,
            customClass: "alert alert-primary",
            width: "200px",
          });
          updateBookingStatus(bookingID, "CONFIRMED", token).then((res) => {
            if (res) {
              Swal.fire({
                position: "top-end",
                html: "<p>Booking Has Been Confirmed!</p>",
                showConfirmButton: false,
                timer: 1500,
                customClass: "alert alert-primary",
                width: "200px",
              }).then(() => {
                window.location.reload();
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  // this will load a script tag which will open up Razorpay payment card to make transactions
  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const showRazorpay = async (amount, bookingID) => {
    await loadScript();

    let bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data
    bodyData.append("amount", amount.toString());
    bodyData.append("booking", bookingID);

    const data = await Axios({
      url: `${API}orders/pay/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      data: bodyData,
    }).then((res) => {
      return res;
    });

    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user

    var options = {
      key_id: process.env.REACT_APP_PUBLIC_KEY, // in react your environment variable must start with REACT_APP_
      key_secret: process.env.REACT_APP_SECRET_KEY,
      amount: data.data.payment.amount,
      currency: "INR",
      name: "Org. Name",
      description: "Test teansaction",
      image: "", // add image url
      order_id: data.data.payment.id,
      handler: function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
        handlePaymentSuccess(response, bookingID);
      },
      prefill: {
        name: "User's name",
        email: "User's email",
        contact: "User's phone",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  return (
    <>
      <Row>
        <Col sm="6">
          <h3>Customer Dashboard</h3>
        </Col>
        <Col lg="12">
          <Card className="bg-secondary shadow border-0">
            <CardHeader>
              <h2>Your Requests</h2>
            </CardHeader>
            <CardBody>
              {bookings.length > 0 ? (
                bookings.map((request, index) => {
                  return (
                    <Row className="m-4" style={{ backgroundColor: "#ecf0f1" }}>
                      <Col lg="4">
                        <Table>
                          <tr>
                            <td>
                              <b>Request ID</b>
                            </td>
                            <td>{request.id}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Turf Name</b>
                            </td>
                            <td>{request.turf.name}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Turf Location</b>
                            </td>
                            <td>
                              {request.turf.location},{request.turf.city}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <b>Turf Price</b>
                            </td>
                            <td>₹ - {request.turf.price} /-</td>
                          </tr>
                        </Table>
                      </Col>
                      <Col lg="4">
                        <Table>
                          <tr>
                            <td>
                              <b>Requested By</b>
                            </td>
                            <td>{request.user.name}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Requested On</b>
                            </td>
                            <td>
                              {moment(request.created_at).toLocaleString()}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <b>Requested Date</b>
                            </td>
                            <td>{moment(request.date).toLocaleString()}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Requested Time</b>
                            </td>
                            <td>{request.time}</td>
                          </tr>
                        </Table>
                      </Col>
                      <Col lg="4">
                        {request.status === "APPROVED_BY_VENDOR" ? (
                          <>
                            {request.status === "REQUESTED" && (
                              <h2>Your Request is Approved</h2>
                            )}
                            <Button
                              color="success"
                              onClick={() => {
                                showRazorpay(request.turf.price, request.id);
                              }}
                            >
                              Accept & Pay
                            </Button>
                            <Button
                              color="danger"
                              onClick={(e) => {
                                e.preventDefault();
                                updateBookingStatus(
                                  request.id,
                                  "CANCELLED_BY_USER",
                                  token
                                )
                                  .then((res) => {
                                    if (res.id) {
                                      window.location.reload();
                                    }
                                  })
                                  .catch((er) => console.log(er));
                              }}
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <Button color="primary" className="mt-4">
                            Current Status - {request.status}
                          </Button>
                        )}
                      </Col>
                    </Row>
                  );
                })
              ) : (
                <h2>No Requests</h2>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CustomerDashboard;
