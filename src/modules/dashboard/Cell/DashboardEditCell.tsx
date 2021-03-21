import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";

import useNotification from "common/useNotification";
import useToggle from "common/useToggle";
import CommonDrawer from "common/components/CommonDrawer";
import { useMerchantMutationPost } from "services/useMerchantMutation";
import MerchantForm from "../MerchantForm";

import { Merchant, MerchantFormValues } from "types";

type DashboardEditCellProps = {
  row: Merchant;
};

const useStyles = makeStyles((theme: Theme) => ({
  edit: { color: theme.palette.primary.light, cursor: "pointer" },
}));

const DashboardEditCell: React.FC<DashboardEditCellProps> = (props) => {
  const { row } = props;
  const { onToggle, ...toggle } = useToggle();
  const c = useStyles();
  const { errorNotification, successNotification } = useNotification();

  const onSuccess = () => {
    onToggle();
    successNotification();
  };
  const onError = () => {
    errorNotification();
  };

  const mutate = useMerchantMutationPost(onSuccess, onError);

  const handleToggle = () => onToggle();
  const handleSubmit = (values: MerchantFormValues) => mutate(values);

  return (
    <>
      <CommonDrawer {...toggle}>
        <MerchantForm
          onSubmit={handleSubmit}
          onClose={handleToggle}
          title="Edit"
          defaultValues={row}
        />
      </CommonDrawer>
      <EditIcon className={c.edit} onClick={handleToggle} />
    </>
  );
};

export default DashboardEditCell;
