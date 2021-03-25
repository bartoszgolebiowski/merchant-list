import { makeStyles, Theme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";

import useNotification from "common/useNotification";
import useToggle from "common/useToggle";
import { useMerchantMutationDelete } from "services/useMerchants";
import DashboardDeleteDialog from "../DashboardDeleteDialog";

type DashboardDeleteCellProps = {
  id: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  delete: {
    color: theme.palette.primary.light,
    cursor: "pointer",
    lineHeight: 0,
  },
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
      <Tooltip title="Delete">
        <span
          onClick={onToggle}
          aria-label={`delete-${id}`}
          role="button"
          className={c.delete}
        >
          <DeleteIcon />
        </span>
      </Tooltip>
    </>
  );
};

export default DashboardDeleteCell;
