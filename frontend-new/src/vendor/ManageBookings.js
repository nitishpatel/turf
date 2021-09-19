import { isAuthenticated } from "auth/helper";
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
import {
  getBookingByVendor,
  getVendorFromLocalStorage,
  updateBookingStatus,
} from "./helper/vendorapicalls";
import $ from "jquery";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const vendor = getVendorFromLocalStorage();
  const { token } = isAuthenticated();
  const [bookingStatus, setBookingStatus] = useState("");
  useEffect(() => {
    setTimeout(() => {
      $("#example").DataTable().destroy();
      getAllBookings();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingStatus]);

  useEffect(() => {
    $("#example").DataTable();
  }, [bookings]);
  const getAllBookings = async () => {
    getBookingByVendor(vendor.id, bookingStatus)
      .then((res) => {
        if (res) {
          setBookings(res);
          console.table(res);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="col-lg-12 align-self-center py-8">
      <Card>
        <CardHeader>
          <Row>
            <Col>
              <h3>Bookings</h3>
            </Col>
            <Col>
              <div className="form-group">
                <select
                  className="form-control"
                  value={bookingStatus}
                  onChange={(e) => {
                    setBookingStatus(e.target.value);
                  }}
                >
                  <option disabled selected>
                    Select Status
                  </option>
                  <option value="">All</option>
                  <option value="REQUESTED">REQUESTED</option>
                  <option value="APPROVED_BY_VENDOR">APPROVED_BY_VENDOR</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="CANCELLED_BY_USER">CANCELLED_BY_USER</option>
                  <option value="CANCELLED_BY_VENDOR">
                    CANCELLED_BY_VENDOR
                  </option>
                </select>
              </div>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Table id="example">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <Button
                      onClick={() => {
                        Swal.fire({
                          text: `Name - ${booking.user.name} , Email - ${booking.user.email}`,
                        });
                      }}
                    >
                      Customer
                    </Button>
                  </td>
                  <td>{booking.date}</td>
                  <td style={{ width: "15%" }}>{booking.time}</td>
                  <td>{booking.price}</td>
                  <td className="badge badge-primary mt-3">{booking.status}</td>
                  <td>{booking.payment_method}</td>
                  <td style={{ width: "35%" }}>
                    <Button
                      color="danger"
                      onClick={(e) => {
                        e.preventDefault();
                        updateBookingStatus(
                          booking.id,
                          "CANCELLED_BY_VENDOR",
                          token
                        )
                          .then((res) => {
                            console.log(res);
                            if (res.id) {
                              Swal.fire({
                                position: "top-end",
                                html: "<p>Booking Has Been Cancelled!</p>",
                                showConfirmButton: false,
                                timer: 1500,
                                customClass: "alert alert-primary",
                                width: "200px",
                              }).then(() => {
                                window.location.reload();
                              });
                            }
                          })
                          .catch((error) => {
                            console.error(error);
                            Swal.fire(
                              "Error!",
                              "There was am error",
                              "error"
                            ).then(() => {
                              window.location.reload();
                            });
                          });
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      color="success"
                      onClick={(e) => {
                        e.preventDefault();
                        updateBookingStatus(
                          booking.id,
                          "APPROVED_BY_VENDOR",
                          token
                        )
                          .then((res) => {
                            console.log(res);
                            if (res.id) {
                              Swal.fire({
                                position: "top-end",
                                html: "<p>Booking Has Confirmed Waiting for User!</p>",
                                showConfirmButton: false,
                                timer: 1500,
                                width: "200px",
                              }).then(() => {
                                window.location.reload();
                              });
                            }
                          })
                          .catch((error) => {
                            console.error(error);
                            Swal.fire(
                              "Error!",
                              "There was am error",
                              "error"
                            ).then(() => {
                              window.location.reload();
                            });
                          });
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      color="warning"
                      onClick={async (e) => {
                        e.preventDefault();
                        const { value: status } = await Swal.fire({
                          title: "Select field validation",
                          input: "select",
                          inputOptions: {
                            STATUS: {
                              APPROVED_BY_VENDOR: "APPROVED_BY_VENDOR",
                              REQUESTED: "REQUESTED",
                              IN_PROGRESS: "IN_PROGRESS",
                              CONFIRMED: "CONFIRMED",
                              CANCELLED_BY_USER: "CANCELLED_BY_USER",
                              CANCELLED_BY_VENDOR: "CANCELLED_BY_VENDOR",
                            },
                          },
                          showCancelButton: true,
                          inputValidator: (value) => {
                            return new Promise((resolve) => {
                              if (value) {
                                resolve();
                              } else {
                                resolve("You need to select a status :)");
                              }
                            });
                          },
                        });

                        if (status) {
                          updateBookingStatus(booking.id, status, token)
                            .then((res) => {
                              console.log(res);
                              if (res.id) {
                                Swal.fire({
                                  position: "top-end",
                                  html: "<p>Booking Status has been changed!</p>",
                                  showConfirmButton: false,
                                  timer: 1500,
                                  customClass: "alert alert-primary",
                                  width: "200px",
                                }).then(() => {
                                  window.location.reload();
                                });
                              }
                            })
                            .catch((error) => {
                              console.error(error);
                              Swal.fire(
                                "Error!",
                                "There was am error",
                                "error"
                              ).then(() => {
                                window.location.reload();
                              });
                            });
                        }
                      }}
                    >
                      Custom
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ManageBookings;
