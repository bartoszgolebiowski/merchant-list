import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

import { MERCHANT_QUERY_KEY, MERCHANT_STALE_TIME } from "common/reactQuery";
import {
  useDashboardDispatchStore,
  useDashboardStore,
  setMerchantPage,
  setMerchantPageSize,
} from "store/dashboard";

import { MerchantFormValues } from "types";

const noop = () => {};

const postMerchant = async (values: MerchantFormValues) => {
  await axios.post(
    `https://i-love-react-and-javascript/api/v1/merchant`,
    values
  );
  return Promise.resolve();
};

const deleteMerchant = async (id: string) => {
  await axios.delete(
    `https://i-love-react-and-javascript/api/v1/merchant/${id}`
  );
  return Promise.resolve();
};

const getMerchants = async (page: number, size: number) => {
  const { data } = await axios.get(
    `https://i-love-react-and-javascript/api/v1/merchant?page=${page}&size=${size}`
  );
  return data;
};

export const useMerchantMutationPost = (onSuccess = noop, onError = noop) => {
  const { page, size } = useDashboardStore();
  const queryCache = useQueryClient();
  const { mutateAsync } = useMutation(
    (values: MerchantFormValues) => postMerchant(values),
    {
      onSuccess: () => {
        queryCache.invalidateQueries([MERCHANT_QUERY_KEY, page, size]);
        onSuccess();
      },
      onError: () => {
        onError();
      },
    }
  );
  return mutateAsync;
};

export const useMerchantMutationDelete = (onSuccess = noop, onError = noop) => {
  const { page, size } = useDashboardStore();
  const queryCache = useQueryClient();
  const { mutateAsync } = useMutation((id: string) => deleteMerchant(id), {
    onSuccess: () => {
      queryCache.invalidateQueries([MERCHANT_QUERY_KEY, page, size]);
      onSuccess();
    },
    onError: () => {
      onError();
    },
  });
  return mutateAsync;
};

export const useMerchants = () => {
  const { page, size } = useDashboardStore();
  const dispatch = useDashboardDispatchStore();

  const { status, data } = useQuery(
    [MERCHANT_QUERY_KEY, page, size],
    () => getMerchants(page, size),
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
