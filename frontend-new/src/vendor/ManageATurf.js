import React, { useEffect, useState } from "react";
import {
  addPhotoToTurf,
  getTurfById,
  getVendorFromLocalStorage,
} from "./helper/vendorapicalls";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import { isAuthenticated } from "auth/helper";
const ManageATurf = () => {
  const { turfID } = useParams();
  const [turf, setTurf] = useState({});
  const { token } = isAuthenticated();
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const toggle = () => setModal(!modal);

  const vendor = getVendorFromLocalStorage();
  useEffect(() => {
    if (!vendor || !vendor["isVerified"]) {
      return Swal.fire("Problem!", "Set up vendor account!", "error").then(
        () => {
          window.location = "/vendor/dashboard";
        }
      );
    }
    getATurf();
    console.log(turfID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turfID]);
  const getATurf = () => {
    return getTurfById(turfID)
      .then((res) => {
        if (res.error) {
          return Swal.fire("Problem!", "Turf not found!", "error").then(() => {
            window.location = "/vendor/dashboard";
          });
        } else {
          setTurf(res);
          console.log(res);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const showAddPhotoModal = () => {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>
          <h5>Add New Photo</h5>
        </ModalHeader>
        <ModalBody>
          <Input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              if (!file) {
                return Swal.fire("Problem!", "No file selected!", "error");
              } else {
                var data = new FormData();
                data.append("image", file);
                data.append("turfId", turfID);
                addPhotoToTurf(data, token);
              }
            }}
          >
            Upload
          </button>
        </ModalFooter>
      </Modal>
    );
  };
  return (
    <div className="col-lg-12 align-self-center py-8">
      <Container>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <h3>Turf Details</h3>
              </CardHeader>
              <CardBody>
                <Table responsive className="table  table-flush">
                  <tbody>
                    <tr>
                      <td>
                        <b>Turf Name:</b>
                      </td>
                      <td>{turf.name}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Turf Description:</b>
                      </td>
                      <td style={{ whiteSpace: "unset" }}>
                        {turf.description}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Turf Amenities:</b>
                      </td>
                      <td>{turf.amenities}</td>
                    </tr>

                    <tr>
                      <td>
                        <b>Turf Rules:</b>
                      </td>
                      <td>{turf.rules}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Turf City:</b>
                      </td>
                      <td>{turf.city}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Turf Address:</b>
                      </td>
                      <td>{turf.location}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col lg={12} className="mt-4">
            <Card>
              <CardHeader>
                <h3>Turf Photos</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  {turf.turf_image ? (
                    turf.turf_image.map((photo, index) => {
                      return (
                        <Col lg={3} key={index}>
                          <img
                            src={photo.image}
                            alt="turf"
                            className="img-fluid"
                          />
                        </Col>
                      );
                    })
                  ) : (
                    <h1>No Photos</h1>
                  )}
                </Row>
              </CardBody>
              <CardFooter>
                <Button
                  color={"primary"}
                  className="btn btn-primary"
                  onClick={toggle}
                >
                  Add Photo
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
      {showAddPhotoModal()}
    </div>
  );
};

export default ManageATurf;
