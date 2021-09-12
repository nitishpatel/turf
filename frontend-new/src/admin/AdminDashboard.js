import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { getUnVerifiedVendors } from "./helper/adminapicalls";
import $ from "jquery";
const AdminDashboard = () => {
  const [state, setState] = useState([]);
  const { token } = isAuthenticated();

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

  return <div className="col-lg-12 align-self-center py-8"></div>;
};

export default AdminDashboard;
