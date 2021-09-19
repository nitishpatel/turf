import Login from "./core/Login";
import VendorRegister from "vendor/VendorRegister";
import VendorDashboard from "vendor/VendorDashboard";
import SetupVendor from "vendor/SetupVendor";
import AdminVerifyVendor from "./admin/AdminVerifyVendor";
import AddATurf from "vendor/AddATurf";
import AdminDashboard from "admin/AdminDashboard";
import ManageAllTurf from "vendor/ManageAllTurf";
import ManageATurf from "vendor/ManageATurf";
import HomePage from "core/HomePage";
import TurfDetails from "core/TurfDetails";
import CustomerRegistration from "customer/CustomerRegistration";
import CustomerDashboard from "customer/CustomerDashboard";
import ManageBookings from "vendor/ManageBookings";
var routes = [
  {
    path: "/index",
    name: "Home",
    icon: "ni ni-circle-08 text-pink",
    component: HomePage,
    layout: "/home",
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: AdminDashboard,
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
  {
    path: "/manage/turf/",
    name: "Manage Turf",
    icon: "ni ni-circle-08 text-pink",
    component: ManageAllTurf,
    layout: "/vendor",
  },
  {
    path: "/turf/manage/:turfID",
    name: "Manage A Turf",
    icon: "ni ni-circle-08 text-pink",
    component: ManageATurf,
    layout: "/vendor",
  },
  {
    path: "/bookings",
    name: "Manage Bookings",
    icon: "ni ni-circle-08 text-pink",
    component: ManageBookings,
    layout: "/vendor",
  },
  {
    path: "/turf/:turfID",
    name: "Turf Details",
    icon: "ni ni-circle-08 text-pink",
    component: TurfDetails,
    layout: "/home",
  },
  {
    path: "/customer",
    name: "Customer Registration",
    icon: "ni ni-circle-08 text-pink",
    component: CustomerRegistration,
    layout: "/auth",
  },
  {
    path: "/dashboard",
    name: "Customer Dashboard",
    icon: "ni ni-circle-08 text-pink",
    component: CustomerDashboard,
    layout: "/customer",
  },
];
export default routes;
