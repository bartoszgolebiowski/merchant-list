import * as React from "react";
import { useQuery } from "react-query";
import axios from "axios";

import {
  BIDS_PAGE_SIZE,
  BIDS_QUERY_KEY,
  BIDS_STALE_TIME,
} from "common/reactQuery";

const getBids = async (id: string, page: number, size: number) => {
  const { data } = await axios.get(
    `https://i-love-react-and-javascript/api/v1/merchant/${id}/bids?page=${page}&size=${size}`
  );
  return data;
};

export const useBids = (id: string) => {
  const [size, setSize] = React.useState(BIDS_PAGE_SIZE);
  const [page, setPage] = React.useState(0);

  const { status, data } = useQuery(
    [BIDS_QUERY_KEY, page, size],
    () => getBids(id, page, size),
    { keepPreviousData: true, staleTime: BIDS_STALE_TIME }
  );

  const handleSetPage = (page: number) => {
    const positivePage = page > 0 ? page : 0;
    setPage(positivePage);
  };

  const handleSetSize = (size: number) => {
    const positiveSize = size > 0 ? size : 0;
    setPage(0);
    setSize(positiveSize);
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