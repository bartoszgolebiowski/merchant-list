import { toast } from "react-toastify";

const useNotification = () => {
  const errorNotification = (message = "Fail") =>
    toast(message, { type: "error" });
  const successNotification = (message = "Success") =>
    toast(message, { type: "success" });

  return {
    errorNotification,
    successNotification,
  };
};

export default useNotification;
