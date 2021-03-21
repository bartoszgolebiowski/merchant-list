import { QueryClient } from "react-query";

export const MERCHANT_QUERY_KEY = "MERCHANT_QUERY_KEY";
export const MERCHANT_PAGE_SIZE = 20;
export const MERCHANT_STALE_TIME = 20000;
export const MERCHANT_PAGINATION_OPTIONS = [10, 20, 25, 50];

export const BIDS_QUERY_KEY = "BIDS_QUERY_KEY";
export const BIDS_PAGE_SIZE = 20;
export const BIDS_STALE_TIME = 20000;
export const BIDS_PAGINATION_OPTIONS = [10, 20, 25, 50];

export const queryClient = new QueryClient();
