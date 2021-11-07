import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  routerRedux,
  Redirect,
} from "dva/router";
import App from "./routes/app";
import { storageToken } from "./utils/constant";

// Pages Route Imports
import Login from "./routes/Login/index";
import SignUp from "./routes/SignUp/index";
import ForgotPassword from "./routes/ForgotPassword/index";
import ResetPassword from "./routes/ResetPassword/index";

// Gaurded Routes Imports
import Parcels from "./routes/Parcels/index";
import ParcelsView from "./routes/Parcels/View/index";
import ParcelsTDP from "./routes/Parcels/TDP/index";
import Entries from "./routes/Entries/index";
import Archived from "./routes/Archived/index";
import Applications from "./routes/Applications/index";
import ApplicationReview from "./routes/Applications/Review/index";
import UsersManagement from "./routes/UserManagement/index";

const { ConnectedRouter } = routerRedux;

const registerModel = (app, model) => {
  if (
    !(app._models.filter((m) => m.namespace === model.namespace).length === 1)
  ) {
    app.model(model);
  }
};

const PrivateRoute = (props) => {
  const AuthToken = localStorage.getItem(`${storageToken}`);
  if (AuthToken) {
    return <Route {...props} />;
  } else {
    return <Redirect to={{ pathname: "/" }} />;
  }
};

const openRoutes = [
  "/",
  "/login",
  "/signup",
  "/forgotpassword",
  "/resetpassword",
  // "/parcels/view",
];

export function RouterConfig({ history, app }) {
  return (
    <ConnectedRouter history={history}>
      <App openRoutes={openRoutes} history={history}>
        <Switch>
          {/* #########   S T A R T :   O P E N      U R L S   #########*/}
          <Route
            path="/"
            exact
            render={(props) => {
              return <Login {...props} />;
            }}
          />
          <Route
            path="/signup"
            exact
            render={(props) => {
              return <SignUp {...props} />;
            }}
          />
          <Route
            path="/forgotpassword"
            exact
            render={(props) => {
              return <ForgotPassword {...props} />;
            }}
          />
          <Route
            path="/resetpassword"
            exact
            render={(props) => {
              return <ResetPassword {...props} />;
            }}
          />
          {/* #########   E N D :    O P E N      U R L S   #########*/}
          {/* #########   S T A R T :   G U A R D E D      U R L S   #########*/}
          <Route
            path="/parcels"
            exact
            render={(props) => {
              return <Parcels {...props} />;
            }}
          />
          <Route
            path="/parcels/view"
            exact
            render={(props) => {
              return <ParcelsView {...props} />;
            }}
          />
          <Route
            path="/parcels/tdp"
            exact
            render={(props) => {
              return <ParcelsTDP {...props} />;
            }}
          />

          <Route
            path="/entries"
            exact
            render={(props) => {
              return <Entries {...props} />;
            }}
          />

          <Route
            path="/application"
            exact
            render={(props) => {
              return <Applications {...props} />;
            }}
          />

          <Route
            path="/application/:id"
            exact
            render={(props) => {
              return <ApplicationReview {...props} />;
            }}
          />

          <Route
            path="/archived"
            exact
            render={(props) => {
              return <Archived {...props} />;
            }}
          />

          <Route
            path="/users"
            exact
            render={(props) => {
              registerModel(app, require("./models/users").default);
              return <UsersManagement {...props} />;
            }}
          />

          {/* #########   E N D :    G U A R D E D      U R L S   #########*/}
          <Route
            render={(props) => {
              return <Redirect to={{ pathname: "/" }} />;
            }}
          />
        </Switch>
      </App>
    </ConnectedRouter>
  );
}
