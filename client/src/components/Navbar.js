import * as React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route, Link } from "react-router-dom";
import Flights from "./Flights";
import Hotels from "./Hotels";
import Itinerary from "./Itinerary";
import Places from "./Places";
import { useState } from "react";
import { Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import LoginModal from "./auth/LoginModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

function NavTabs({ auth }) {
  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  NavTabs.propTypes = {
    auth: PropTypes.object.isRequired,
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const routes = ["/flights", "/hotels", "/itinerary", "/places"];

  const authLinks = (
    <Fragment>
      <NavItem>
        <strong mr-3="true" color="black">
          {auth.user ? `Welcome ${auth.user.name}` : ""}
        </strong>
      </NavItem>

      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );

  return (
    <Router>
      <Route path="/">
        <Navbar dark expand="sm" className="mb-5">
          <Container>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
              centered
            >
              <Tab label="Places" to={routes[3]} component={Link} />
              <Tab label="Flights" to={routes[0]} component={Link} />
              <Tab label="Hotels" to={routes[1]} component={Link} />
              <Tab label="Itinerary" to={routes[2]} component={Link} />
            </Tabs>
          </Container>

          <Container>
            <NavbarBrand href="/">
              <b style={{ color: "black" }}>Home</b>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {auth.isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </Route>

      <Switch>
        <Route exact path="/flights" component={Flights} />
        <Route exact path="/hotels" component={Hotels} />
        <Route exact path="/itinerary" component={Itinerary} />
        <Route exact path="/places" component={Places} />
      </Switch>
    </Router>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(NavTabs);
