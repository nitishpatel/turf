import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { getUnVerifiedVendors, verifyAVendor } from "./helper/adminapicalls";
import $ from "jquery";
import Swal from "sweetalert2";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
const AdminVerifyVendor = () => {
  const [state, setState] = useState([]);
  const { token } = isAuthenticated();
  const [singleVendor, setSingleVendor] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  useEffect(() => {
    setTimeout(() => {
      $("#example").DataTable().destroy();
      getNewVendors();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    $("#example").DataTable();
  }, [state]);
  const getNewVendors = () => {
    return getUnVerifiedVendors(token)
      .then((data) => {
        if (data) {
          console.log(data);
          setState(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const showModal = () => {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Verify A Vendor</ModalHeader>
        <ModalBody>
          {singleVendor ? (
            <div className="container">
              <h2>Vendor Details</h2>
              <hr />
              <h6>Name : {singleVendor["name"]}</h6>
              <h6>Email : {singleVendor["email"]}</h6>
              <h6>Phone : {singleVendor["phone"]}</h6>
              <h6>
                Address :{" "}
                <a
                  href={`https://maps.google.com/?q=${singleVendor["registrationAddress"]}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {singleVendor["registrationAddress"]}
                </a>
              </h6>
              <h6>Type Of Entity : {singleVendor["typeOfEntity"]}</h6>
              <h6>PAN : {singleVendor["panNumber"]}</h6>
              <h6>GSTIN : {singleVendor["gstin"]}</h6>
              <h2>Owner Details</h2>
              <hr />
              <h6>Name : {singleVendor["ownerName"]}</h6>
              <h6>Email : {singleVendor["ownerEmail"]}</h6>
              <h6>Phone : {singleVendor["ownerPhone"]}</h6>
              <h2>User Details</h2>
              <hr />
              <h6>ID : {singleVendor["user"]["id"]}</h6>
              <h6>Name : {singleVendor["user"]["name"]}</h6>
              <h6>Email : {singleVendor["user"]["email"]}</h6>
            </div>
          ) : (
            <div className="container">Select a Vendor</div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={(e) => {
              e.preventDefault();

              verifyAVendor({ isVerified: true }, singleVendor["id"], token)
                .then((data) => {
                  if (data) {
                    console.log(data);
                    Swal.fire(
                      "Good job!",
                      "Vendor Verified Successfully!",
                      "success"
                    ).then(() => {
                      window.location.reload();
                    });
                  }
                })
                .catch((err) => console.error(err));
            }}
          >
            Verify
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  };
  return (
    <div className="col-lg-12 align-self-center py-8">
      {state && (
        <div className="col-lg-12 p-4 table-responsive">
          <table className="table  table-striped" id="example">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Status</th>
                <th>See Details and Verify</th>
              </tr>
            </thead>
            <tbody>
              {state.map((vendor, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <h6>{vendor["id"]}</h6>
                    </td>
                    <td>{vendor["name"]}</td>
                    <td>{vendor["email"]}</td>

                    <td>{vendor["user"]["name"]}</td>
                    <td>{vendor["user"]["email"]}</td>
                    <td>
                      {vendor["isVerified"] ? "Verified" : "Not Verified"}
                    </td>
                    <td>
                      <button
                        className="btn btn-warning"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#viewUserModal"
                        onClick={(e) => {
                          // setIsBook(student);
                          e.preventDefault();
                          toggle();
                          setSingleVendor(vendor);
                        }}
                      >
                        Verify
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {showModal()}
    </div>
  );
};

export default AdminVerifyVendor;
