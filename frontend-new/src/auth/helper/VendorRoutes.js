import Vendor from "layouts/Vendor";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isVendor } from "./index";

const VendorRoute = (props) => {
  const { rest } = props;
  return (
    <Route
      {...rest}
      render={(props) =>
        isVendor() ? (
          <Vendor {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
            }}
          />
        )
      }
    />
  );
};

export default VendorRoute;
