import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { MERCHANT_QUERY_KEY } from "common/reactQuery";
import { useDashboardStore } from "store/dashboard";
import { MerchantFormValues } from "types";

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

export const useMerchantMutationPost = (
  onSuccess = () => {},
  onError = () => {}
) => {
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

export const useMerchantMutationDelete = (
  onSuccess = () => {},
  onError = () => {}
) => {
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
