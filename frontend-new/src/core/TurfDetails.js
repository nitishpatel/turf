import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Col, Container, Row } from "reactstrap";
import { createBookingRequest, getTurfById } from "./helper/corehelper";
import { isAuthenticated } from "../auth/helper";
import moment from "moment";
import Swal from "sweetalert2";
const TurfDetails = () => {
  const [turf, setTurf] = useState({
    turf_image: [],
  });
  const [currentImage, setCurrentImage] = useState();
  const { token, user } = isAuthenticated();
  const { turfID } = useParams();
  const [state, setState] = useState({
    bookingDate: "",
    bookingTime: "",
    paymentMethod: "",
  });
  const [effectImage, setEffectImage] = useState("");
  useEffect(() => {
    getTurf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turfID]);
  const getTurf = async () => {
    return getTurfById(turfID)
      .then((data) => {
        if (data) {
          setTurf(data);
          setCurrentImage(data.turf_image[0].image);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { turf_image } = turf;
  const { bookingDate, bookingTime, paymentMethod } = state;

  const addBooking = (e) => {
    e.preventDefault();
    console.log("hello");
    console.log(bookingDate, bookingTime, paymentMethod);
    if (bookingDate && bookingTime && paymentMethod) {
      createBookingRequest(
        {
          date: moment(bookingDate).format("YYYY-MM-DD"),
          time: bookingTime,
          payment_method: paymentMethod,
          price: turf.price,
          vendor: turf.vendorId,
          turf: turfID,
          user: user.id,
        },
        token
      )
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "Please fill all the fields",
        text: "",
        showCancelButton: true,
        confirmButtonText: "Ok",
        cancelButtonText: "Cancel",
      });
    }
  };
  return (
    <div>
      <Container>
        <Row>
          {turf_image.length > 0 ? (
            <Col lg={6} className="align-self-center">
              <img
                style={{ width: "100%" }}
                src={currentImage}
                alt="main turf"
                className={effectImage}
              />
              <Row className="mt-3">
                {turf_image.map((item, index) => {
                  return (
                    <Col lg={3} className="align-self-center">
                      <img
                        src={item.image}
                        onClick={() => {
                          setEffectImage(null);
                          setCurrentImage(item.image);

                          setEffectImage(
                            "animate__animated animate__fadeInLeft"
                          );
                        }}
                        style={{ width: "100%" }}
                        alt="turf"
                      />
                    </Col>
                  );
                })}
              </Row>
            </Col>
          ) : (
            <h2>No Photos</h2>
          )}
          <Col lg={6}>
            <h1>{turf.name}</h1>
            <p>
              {turf.location}, {turf.city}
            </p>
            <p>{turf.description}</p>
            <h3>Price - {turf.price}/-</h3>
            <h6>
              <h6>Amenities</h6>
              {turf.amenities}
            </h6>
            <h6>
              <h6>Rules</h6>
              {turf.rules}
            </h6>
            {token ? (
              <form>
                <Row>
                  <div className="form-group m-1">
                    <label for="inputDate4">Booking Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputDate4"
                      placeholder="Booking Date"
                      name="dob"
                      onChange={(e) => {
                        setState({ ...state, bookingDate: e.target.value });
                      }}
                      min={moment().format("YYYY-MM-DD")}
                    />
                  </div>
                  <div className="form-group m-1">
                    <label for="inputDate4">Booking Time</label>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        setState({ ...state, bookingTime: e.target.value });
                      }}
                    >
                      <option value="12:00 AM - 01:00 AM">
                        12:00 AM - 01:00 AM
                      </option>
                      <option value="01:00 AM - 02:00 AM">
                        01:00 AM - 02:00 AM
                      </option>
                      <option value="02:00 AM - 03:00 AM">
                        02:00 AM - 03:00 AM
                      </option>
                      <option value="03:00 AM - 04:00 AM">
                        03:00 AM - 04:00 AM
                      </option>
                      <option value="04:00 AM - 05:00 AM">
                        04:00 AM - 05:00 AM
                      </option>
                      <option value="05:00 AM - 06:00 AM">
                        05:00 AM - 06:00 AM
                      </option>
                      <option value="06:00 AM - 07:00 AM">
                        06:00 AM - 07:00 AM
                      </option>
                      <option value="07:00 AM - 08:00 AM">
                        07:00 AM - 08:00 AM
                      </option>
                      <option value="08:00 AM - 09:00 AM">
                        08:00 AM - 09:00 AM
                      </option>
                      <option value="09:00 AM - 10:00 AM">
                        09:00 AM - 10:00 AM
                      </option>
                      <option value="10:00 AM - 11:00 AM">
                        10:00 AM - 11:00 AM
                      </option>
                      <option value="11:00 AM - 12:00 PM">
                        11:00 AM - 12:00 PM
                      </option>
                      <option value="12:00 PM - 01:00 PM">
                        12:00 PM - 01:00 PM
                      </option>
                      <option value="01:00 PM - 02:00 PM">
                        01:00 PM - 02:00 PM
                      </option>
                      <option value="02:00 PM - 03:00 PM">
                        02:00 PM - 03:00 PM
                      </option>
                      <option value="03:00 PM - 04:00 PM">
                        03:00 PM - 04:00 PM
                      </option>
                      <option value="04:00 PM - 05:00 PM">
                        04:00 PM - 05:00 PM
                      </option>
                      <option value="05:00 PM - 06:00 PM">
                        05:00 PM - 06:00 PM
                      </option>
                      <option value="06:00 PM - 07:00 PM">
                        06:00 PM - 07:00 PM
                      </option>
                      <option value="07:00 PM - 08:00 PM">
                        07:00 PM - 08:00 PM
                      </option>
                      <option value="08:00 PM - 09:00 PM">
                        08:00 PM - 09:00 PM
                      </option>
                      <option value="09:00 PM - 10:00 PM">
                        09:00 PM - 10:00 PM
                      </option>
                      <option value="10:00 PM - 11:00 PM">
                        10:00 PM - 11:00 PM
                      </option>
                      <option value="11:00 PM - 12:00 AM">
                        11:00 PM - 12:00 AM
                      </option>
                    </select>
                  </div>
                  <div className="form-group m-1">
                    <label for="inputDate4">Payment Type</label>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        setState({ ...state, paymentMethod: e.target.value });
                      }}
                    >
                      <option value="CASH">Cash</option>
                      <option value="CREDIT_CARD">Credit Card</option>
                      <option value="UPI">UPI</option>
                      <option value="DEBIT_CARD">Debit Card</option>
                    </select>
                  </div>
                  <Col lg={6}>
                    <Button
                      className="m-1"
                      color="warning"
                      type="submit"
                      onClick={(e) => {
                        addBooking(e);
                      }}
                    >
                      Add Slot Request
                    </Button>
                  </Col>
                </Row>
              </form>
            ) : (
              <button
                className="btn btn-warning"
                onClick={() => {
                  window.location.href = "/auth/login";
                }}
              >
                Login To Book Slot
              </button>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TurfDetails;
