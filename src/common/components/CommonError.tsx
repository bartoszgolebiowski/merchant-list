import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Error from "assets/error.svg";

const useStyles = makeStyles(() => ({
  error: {
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    "& img": { margin: "1rem" },
  },
}));

const CommonError = () => {
  const classes = useStyles();

  return (
    <Container className={classes.error}>
      <Typography align="center" variant="h2">
        Oops! Something went wrong.
      </Typography>
      <Typography variant="h5">
        <a href=".">Refresh</a>
      </Typography>
      <img src={Error} alt="error" />
    </Container>
  );
};

export default CommonError;
