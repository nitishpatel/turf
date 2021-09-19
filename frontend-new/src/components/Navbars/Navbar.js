/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { isAuthenticated, signout } from "../../auth/helper";
const AdminNavbar = () => {
  const { token } = isAuthenticated();
  return (
    <>
      <Navbar
        className="navbar-top navbar-horizontal navbar-dark bg-dark"
        expand="md"
      >
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            MyGrounds
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">MyGrounds</Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nav-link-icon" to="/" tag={Link}>
                  <span className="nav-link-inner--text">Home</span>
                </NavLink>
              </NavItem>
              <NavItem>
                {token ? (
                  <NavLink className="nav-link-icon" to="/auth/" tag={Link}>
                    <span className="nav-link-inner--text">Dashboard</span>
                  </NavLink>
                ) : (
                  <NavLink className="nav-link-icon" to="/auth/" tag={Link}>
                    <span className="nav-link-inner--text">Login</span>
                  </NavLink>
                )}
              </NavItem>
              <NavItem>
                {token && (
                  <NavLink
                    className="nav-link-icon"
                    onClick={() => {
                      signout();
                    }}
                    tag={Link}
                  >
                    <span className="nav-link-inner--text">Logout</span>
                  </NavLink>
                )}
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
