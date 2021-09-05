import Admin from "layouts/Admin";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdmin } from "./index";

const AdminRoute = (props) => {
  const { rest } = props;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin() ? (
          <Admin {...props} />
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

export default AdminRoute;
