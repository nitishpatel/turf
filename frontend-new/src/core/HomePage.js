import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  Col,
  Container,
  Row,
} from "reactstrap";
import { getAllTurf } from "./helper/corehelper";

const HomePage = () => {
  const [turfList, setTurfList] = useState([]);
  useEffect(() => {
    getAllTurfList();
  }, []);
  const getAllTurfList = () => {
    getAllTurf()
      .then((data) => {
        if (data) {
          setTurfList(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h1>Home Page</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {turfList.map((turf) => {
            return (
              <Col lg="4">
                <Card style={{ minHeight: "300px;", maxHeight: "300px;" }}>
                  <CardHeader>
                    <CardImg
                      height={200}
                      variant="top"
                      src={turf.turf_image[0]["image"]}
                    />
                  </CardHeader>
                  <CardBody>
                    <h3>{turf.name}</h3>
                    <p className="text">{turf.description}</p>
                    <h1>
                      <Badge color="success" pill>
                        ₹ {turf.price}
                      </Badge>
                    </h1>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
