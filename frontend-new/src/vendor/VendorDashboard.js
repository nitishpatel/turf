import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { getVendor } from "./helper/vendorapicalls";

const VendorDashboard = () => {
  var { user } = isAuthenticated();
  const [state, setState] = useState();
  useEffect(() => {
    getAVendor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
                <h1 className="font-weight-bolder text-center">
                  Your Account is not yet Verified, Wait for the admin to verify
                  it
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="container-fluid header bg-gradient-info py-7 py-lg-8">
      <div className="row flex-nowrap">
        <div className="col py-3">
          <div className="row">{state && userpanel()}</div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
