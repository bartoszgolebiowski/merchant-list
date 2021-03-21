import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

type DashboardDeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  onDelete: () => void
};

const DashboardDeleteDialog :React.FC<DashboardDeleteDialogProps>= (props) => {
  const { open, onClose, onDelete } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-confirmation-dialog"
    >
      <DialogTitle id="delete-confirmation-title">
        Delete merchant action
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-confirmation-content">
          Do you want to remove this record?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          No
        </Button>
        <Button onClick={onDelete} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DashboardDeleteDialog;
