import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { getVendor } from "./helper/vendorapicalls";
import VendorNavbar from "./VendorNavbar";

const VendorProfile = () => {
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

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <VendorNavbar />
        <div className="col py-3">
          <div className="row">
            <div className="col-lg-12 align-self-center p-4">Profile</div>
            {state && (
              <div>
                <h5>{state["name"]}</h5>
                <h6>{state["typeOfEntity"]}</h6>
                <h6>Vendor CIN - {state["vendorCIN"]}</h6>
                <h6>Address - {state["registrationAddress"]}</h6>
                <h6>Email - {state["email"]}</h6>
                <h6>Phone - {state["phone"]}</h6>
                <h6>PAN Number - {state["panNumber"]}</h6>
                <h6>GSTIN - {state["gstin"]}</h6>
                <h6>Owner Name - {state["ownerName"]}</h6>
                <h6>Owner Email - {state["ownerEmail"]}</h6>
                <h6>Owner Phone - {state["ownerPhone"]}</h6>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
