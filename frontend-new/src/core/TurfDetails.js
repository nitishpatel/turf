import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Col, Container, Row } from "reactstrap";
import { getTurfById } from "./helper/corehelper";
import { isAuthenticated } from "../auth/helper";
const TurfDetails = () => {
  const [turf, setTurf] = useState({
    turf_image: [],
  });
  const [currentImage, setCurrentImage] = useState();
  const { token, user } = isAuthenticated();
  const { turfID } = useParams();
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
              <div>
                <h4>Hello</h4>
                <h4>Hello</h4>
              </div>
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
