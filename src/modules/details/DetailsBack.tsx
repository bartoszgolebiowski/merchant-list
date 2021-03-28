import { useHistory } from "react-router";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme: Theme) => ({
  back: { color: theme.palette.primary.light, cursor: "pointer" },
}));

const DetailsBack = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <Tooltip title="Back">
      <IconButton aria-label="back" onClick={handleBack}>
        <ArrowBackIcon className={classes.back} />
      </IconButton>
    </Tooltip>
  );
};

export default DetailsBack;
