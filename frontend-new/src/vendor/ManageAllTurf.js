import React, { useEffect, useState } from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import { Badge, Button, Table } from "reactstrap";
import {
  getAllTurfByVendor,
  getVendorFromLocalStorage,
} from "./helper/vendorapicalls";
const ManageAllTurf = () => {
  const [state, setState] = useState([]);
  const vendor = getVendorFromLocalStorage();

  useEffect(() => {
    setTimeout(() => {
      $("#example").DataTable().destroy();
      getAllTurfs();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    $("#example").DataTable();
  }, [state]);
  const getAllTurfs = () => {
    if (!vendor || !vendor["isVerified"]) {
      return Swal.fire("Problem!", "Set up vendor account!", "error").then(
        () => {
          window.location = "/vendor/dashboard";
        }
      );
    }
    return getAllTurfByVendor(vendor.id)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.table(data);
          setState(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="col-lg-12 align-self-center py-8">
      {state && (
        <div className="col-lg-12 p-4">
          <Table className="table  table-flush" responsive id="example">
            <thead className="thead-light">
              <tr>
                <th>Id</th>
                <th>Active</th>
                <th>Featured</th>
                <th>City</th>
                <th>Name</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {state.map((turf, index) => {
                return (
                  <tr key={index}>
                    <td>{turf["id"]}</td>
                    <td>{turf["active"] ? "Active" : "Hold"}</td>
                    <td>
                      <h5>
                        {" "}
                        <Badge
                          color={turf["featured"] ? "success" : "danger"}
                          className=" mr-4"
                          pill
                        >
                          {turf["featured"] ? "Featured" : "Not Featured"}
                        </Badge>
                      </h5>
                    </td>
                    <td>{turf["city"]}</td>
                    <td>{turf["name"]}</td>
                    <td>
                      <Button
                        onClick={() => {
                          window.location = `/vendor/turf/manage/${turf["id"]}`;
                        }}
                      >
                        Manage
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ManageAllTurf;
