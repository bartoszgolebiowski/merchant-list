import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";

type MerchantFormProps = {
  title: string;
  onClose: () => void;
};

const useStyles = makeStyles(() => ({
  closeIcon: { cursor: "pointer", lineHeight: 0 },
}));

const MerchantFormHeader: React.FC<MerchantFormProps> = (props) => {
  const { title, onClose } = props;
  const c = useStyles();

  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h4">{title}</Typography>
      <Box
        component="span"
        onClick={onClose}
        className={c.closeIcon}
        role="button"
        aria-label="close-form"
      >
        <CloseIcon />
      </Box>
    </Box>
  );
};

export default MerchantFormHeader;
