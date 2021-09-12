import Index from "views/Index.js";
import Register from "views/examples/Register.js";
import Login from "./core/Login";
import VendorRegister from "vendor/VendorRegister";
import VendorDashboard from "vendor/VendorDashboard";
import SetupVendor from "vendor/SetupVendor";
import AdminVerifyVendor from "./admin/AdminVerifyVendor";
import AddATurf from "vendor/AddATurf";
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/verify/vendor",
    name: "Verify Vendor",
    icon: "ni ni-tv-2 text-primary",
    component: AdminVerifyVendor,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/vendor/register",
    name: "Vendor Register",
    icon: "ni ni-circle-08 text-pink",
    component: VendorRegister,
    layout: "/auth",
  },
  {
    path: "/dashboard",
    name: "Vendor Dashboard",
    icon: "ni ni-circle-08 text-pink",
    component: VendorDashboard,
    layout: "/vendor",
  },
  {
    path: "/setup",
    name: "Vendor setup",
    icon: "ni ni-circle-08 text-pink",
    component: SetupVendor,
    layout: "/vendor",
  },
  {
    path: "/add/turf/",
    name: "Add Turf",
    icon: "ni ni-circle-08 text-pink",
    component: AddATurf,
    layout: "/vendor",
  },
];
export default routes;
