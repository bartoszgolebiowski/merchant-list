import { makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";

import { useMerchantMutationPost, useMerchants } from "services/useMerchants";
import CommonDrawer from "common/components/CommonDrawer";
import useNotification from "common/useNotification";
import useToggle from "common/useToggle";

import MerchantForm from "./Form/MerchantForm";
import { MerchantFormValues } from "types";

const useStyles = makeStyles((theme: Theme) => ({
  create: { color: theme.palette.primary.light, cursor: "pointer" },
}));

const DashboardCreate = () => {
  const { onToggle, ...toggle } = useToggle();
  const c = useStyles();
  const { errorNotification, successNotification } = useNotification();
  const { status } = useMerchants();

  const onSuccess = () => {
    toggle.onClose();
    successNotification();
  };
  const onError = () => {
    errorNotification();
  };

  const mutate = useMerchantMutationPost(onSuccess, onError);

  const handleToggle = () => onToggle();
  const handleSubmit = (values: MerchantFormValues) => {
    return mutate(values);
  };

  return status !== "error" ? (
    <>
      <CommonDrawer {...toggle}>
        <MerchantForm onSubmit={handleSubmit} onClose={handleToggle} />
      </CommonDrawer>
      <Tooltip title="Create">
        <IconButton aria-label="create" onClick={handleToggle}>
          <AddIcon className={c.create} />
        </IconButton>
      </Tooltip>
    </>
  ) : null;
};

export default DashboardCreate;
