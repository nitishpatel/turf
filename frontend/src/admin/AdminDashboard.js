import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import AdminNavbar from "./AdminNavbar";
const AdminDashboard = () => {
  var { token, user } = isAuthenticated();
  const [state, setState] = useState();
  useEffect(() => {}, []);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <AdminNavbar />
        <div className="col py-3">
          <div className="row">
            <div className="col-lg-12 align-self-center p-4">Dashboard</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
