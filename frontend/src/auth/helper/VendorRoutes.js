import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isVendor } from "./index";
const VendorRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isVendor() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default VendorRoutes;
