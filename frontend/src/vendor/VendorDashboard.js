import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { getVendor } from "./helper/vendorapicalls";
import VendorNavbar from "./VendorNavbar";

const VendorDashboard = () => {
  var { user } = isAuthenticated();
  const [state, setState] = useState();
  useEffect(() => {
    getAVendor();
  });
  const getAVendor = () => {
    return getVendor(user["id"])
      .then((data) => {
        console.log(typeof data);
        console.log(data);

        if (data.length === 0) {
          console.log("REDIRECT");
          window.location = "/vendor/setup";
        } else {
          console.log("STAY");

          setState(data[0]);
        }
      })
      .then((err) => console.log(err));
  };
  const userpanel = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {!state["isVerified"] && (
              <div>
                <h3 className="text-danger text-center">
                  Your Account is not yet Verified, Wait for the admin to verify
                  it
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <VendorNavbar />
        <div className="col py-3">
          <div className="row">
            <div className="col-lg-12 align-self-center p-4">Dashboard</div>
            {state && userpanel()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
