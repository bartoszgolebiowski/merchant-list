import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import { MERCHANT_PAGE_SIZE } from "common/reactQuery";
import { DashboardProvider } from "store/dashboard";

const Dashboard = React.lazy(() => import("views/Dashboard"));
const Details = React.lazy(() => import("views/Details"));
const NotFound = React.lazy(() => import("views/NotFound"));

const Router = () => {
  return (
    <BrowserRouter>
      <DashboardProvider page={0} size={MERCHANT_PAGE_SIZE}>
        <React.Suspense fallback={<CircularProgress />}>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </React.Suspense>
      </DashboardProvider>
    </BrowserRouter>
  );
};

export default Router;
