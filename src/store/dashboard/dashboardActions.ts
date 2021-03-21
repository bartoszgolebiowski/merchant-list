export const SET_MERCHANT_PAGE = "SET_MERCHANT_PAGE";
export const SET_MERCHANT_PAGE_SIZE = "SET_MERCHANT_PAGE_SIZE";

type SetMerchantPageAction = {
  type: typeof SET_MERCHANT_PAGE;
  page: number;
};

type SetMerchantPageSizeAction = {
  type: typeof SET_MERCHANT_PAGE_SIZE;
  size: number;
};

export const setMerchantPage = (page: number): SetMerchantPageAction => ({
  type: SET_MERCHANT_PAGE,
  page,
});

export const setMerchantPageSize = (
  size: number
): SetMerchantPageSizeAction => ({
  type: SET_MERCHANT_PAGE_SIZE,
  size,
});

export type DashboardActions =
  | SetMerchantPageAction
  | SetMerchantPageSizeAction;
