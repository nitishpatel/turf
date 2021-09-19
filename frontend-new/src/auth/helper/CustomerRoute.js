import Customer from "layouts/Customer";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const CustomerRoute = (props) => {
  const { rest } = props;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Customer {...props} />
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

export default CustomerRoute;
