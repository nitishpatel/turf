import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/scss/customstyle.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import VendorLayout from "layouts/Vendor.js";
import HomeLayout from "layouts/Home.js";
import AdminRoute from "auth/helper/AdminRoutes";
import VendorRoute from "auth/helper/VendorRoutes";
import "datatables.net-dt/js/dataTables.dataTables";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import "./style.css";
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <AdminRoute
        path="/admin"
        render={(props) => <AdminLayout {...props} />}
      />
      <VendorRoute
        path="/vendor"
        render={(props) => <VendorLayout {...props} />}
      />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/home" render={(props) => <HomeLayout {...props} />} />
      <Redirect from="/" to="/home/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
