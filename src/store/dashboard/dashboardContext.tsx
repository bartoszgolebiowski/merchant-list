import * as React from "react";
import { MERCHANT_PAGE_SIZE } from "common/reactQuery";
import { DashboardActions } from "./dashboardActions";
import { DashboardContextValues, reducer } from "./dashboardReducer";

export const DashboardContext = React.createContext<
  DashboardContextValues | undefined
>(undefined);

export const DashboardContextDispatch = React.createContext<
  React.Dispatch<DashboardActions> | undefined
>(undefined);

const useDashboardStore = (): DashboardContextValues => {
  const store = React.useContext<DashboardContextValues | undefined>(
    DashboardContext
  );
  if (!store) {
    throw new Error(
      "Cannot use `DashboardContext` outside DashboardContext.Provider"
    );
  }
  return store;
};

const useDashboardDispatchStore = (): React.Dispatch<DashboardActions> => {
  const store = React.useContext<React.Dispatch<DashboardActions> | undefined>(
    DashboardContextDispatch
  );
  if (!store) {
    throw new Error(
      "Cannot use `DashboardContextDispatch` outside DashboardContextDispatch.Provider"
    );
  }
  return store;
};

const DashboardProvider = ({
  children,
  page = 0,
  size = MERCHANT_PAGE_SIZE,
}: DashboardContextValues & { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    page,
    size,
  });

  return (
    <DashboardContext.Provider value={state}>
      <DashboardContextDispatch.Provider value={dispatch}>
        {children}
      </DashboardContextDispatch.Provider>
    </DashboardContext.Provider>
  );
};

export { useDashboardStore, useDashboardDispatchStore, DashboardProvider };
