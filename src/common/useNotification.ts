import { useSnackbar } from "notistack";

const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();
  const errorNotification = (message = "Fail") =>
    enqueueSnackbar(message, { variant: "error" });
  const successNotification = (message = "Success") =>
    enqueueSnackbar(message, { variant: "success" });

  return {
    errorNotification,
    successNotification,
  };
};

export default useNotification;
