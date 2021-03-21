import { useHistory } from "react-router";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme: Theme) => ({
  back: { color: theme.palette.primary.light, cursor: "pointer" },
}));

const DetailsBack = () => {
  const c = useStyles();
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };
  
  return (
    <IconButton aria-label="back" onClick={handleBack}>
      <ArrowBackIcon className={c.back} />
    </IconButton>
  );
};

export default DetailsBack;
