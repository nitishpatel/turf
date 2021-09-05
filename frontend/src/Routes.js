import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import AdminVerifyVendor from "./admin/AdminVerifyVendor";
import AdminRoutes from "./auth/helper/AdminRoutes";
import VendorRoutes from "./auth/helper/VendorRoutes";
import Home from "./core/Home";
import Signin from "./core/Login";
import AddATurf from "./vendor/AddATurf";
import SetupVendor from "./vendor/SetupVendor";
import VendorDashboard from "./vendor/VendorDashboard";
import VendorProfile from "./vendor/VendorProfile";
import VendorRegister from "./vendor/VendorRegister";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* NORMAL ROUTES */}

        <Route path="/" exact component={Home} />
        <Route path="/register/vendor" exact component={VendorRegister} />
        <Route path="/signin/" exact component={Signin} />

        {/* VENDOR ROUTES */}
        <VendorRoutes
          path="/vendor/dashboard"
          exact
          component={VendorDashboard}
        />
        <VendorRoutes path="/vendor/profile" exact component={VendorProfile} />
        <VendorRoutes path="/vendor/setup" exact component={SetupVendor} />
        <VendorRoutes path="/vendor/add/turf" exact component={AddATurf} />

        {/* ADMIN ROUTES */}
        <AdminRoutes path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoutes
          path="/admin/verify/vendor"
          exact
          component={AdminVerifyVendor}
        />

        {/* <Route path="/:id" exact component={Site} /> */}
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
