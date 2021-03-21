import { useQuery } from "react-query";
import axios from "axios";

import { MERCHANT_QUERY_KEY, MERCHANT_STALE_TIME } from "common/reactQuery";
import {
  useDashboardDispatchStore,
  useDashboardStore,
  setMerchantPage,
  setMerchantPageSize,
} from "store/dashboard";

const fetchMerchants = async (page: number, size: number) => {
  const { data } = await axios.get(
    `https://i-love-react-and-javascript/api/v1/merchant?page=${page}&size=${size}`
  );
  return data;
};

const useMerchants = () => {
  const { page, size } = useDashboardStore();
  const dispatch = useDashboardDispatchStore();

  const { status, data } = useQuery(
    [MERCHANT_QUERY_KEY, page, size],
    () => fetchMerchants(page, size),
    { keepPreviousData: true, staleTime: MERCHANT_STALE_TIME }
  );

  const handleSetPage = (page: number) => {
    const positivePage = page > 0 ? page : 0;
    dispatch(setMerchantPage(positivePage));
  };

  const handleSetSize = (size: number) => {
    const positiveSize = size > 0 ? size : 0;
    dispatch(setMerchantPage(0));
    dispatch(setMerchantPageSize(positiveSize));
  };

  return {
    status,
    data,
    page,
    size,
    setPage: handleSetPage,
    setSize: handleSetSize,
  };
};

export default useMerchants;
