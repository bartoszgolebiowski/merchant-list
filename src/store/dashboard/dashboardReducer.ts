import {
  DashboardActions,
  SET_MERCHANT_PAGE,
  SET_MERCHANT_PAGE_SIZE,
} from "./dashboardActions";

export type DashboardContextValues = {
  page: number;
  size: number;
};

export const reducer = (
  state: DashboardContextValues,
  action: DashboardActions
) => {
  switch (action.type) {
    case SET_MERCHANT_PAGE: {
      const { page } = action;
      return {
        ...state,
        page,
      };
    }
    case SET_MERCHANT_PAGE_SIZE: {
      const { size } = action;
      return {
        ...state,
        size,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}, state: ${state}`);
    }
  }
};
