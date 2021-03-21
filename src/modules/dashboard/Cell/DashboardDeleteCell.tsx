import { makeStyles, Theme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

import useNotification from "common/useNotification";
import useToggle from "common/useToggle";
import { useMerchantMutationDelete } from "services/useMerchantMutation";
import DashboardDeleteDialog from "../DashboardDeleteDialog";

type DashboardDeleteCellProps = {
  id: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  delete: { color: theme.palette.primary.light, cursor: "pointer" },
}));

const DashboardDeleteCell: React.FC<DashboardDeleteCellProps> = (props) => {
  const { id } = props;
  const { open, onToggle } = useToggle();
  const c = useStyles();
  const { errorNotification, successNotification } = useNotification();

  const onSuccess = () => {
    onToggle();
    successNotification();
  };
  const onError = () => {
    errorNotification();
  };

  const mutate = useMerchantMutationDelete(onSuccess, onError);
  const handleToggle = () => onToggle();
  const handleSubmit = () => mutate(id);

  return (
    <>
      <DashboardDeleteDialog
        open={open}
        onClose={handleToggle}
        onDelete={handleSubmit}
      />
      <DeleteIcon className={c.delete} onClick={onToggle} />
    </>
  );
};

export default DashboardDeleteCell;
