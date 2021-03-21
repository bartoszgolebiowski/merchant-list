import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Error from "assets/404.svg";

const useStyles = makeStyles(() => ({
  notFound: {
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    "& img": { margin: "1rem" },
    "& h2": { marginBottom: "2rem" },
  },
}));

const NotFound = () => {
  const c = useStyles();

  return (
    <Container className={c.notFound}>
      <Typography align="center" variant="h2">
        Oops! This page does not exist.
      </Typography>
      <Typography variant="h5">
        <Link to="/">Back to dashboard</Link>
      </Typography>
      <img src={Error} alt="404" />
    </Container>
  );
};

export default NotFound;
