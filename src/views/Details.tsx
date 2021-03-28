import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import DetailsTable from "modules/details/DetailsTable";
import DetailsBack from "modules/details/DetailsBack";

type URLParams = {
  id: string;
};

const useStyles = makeStyles(() => ({
  detailsContainer: { padding: "2rem 0" },
}));

const Details = () => {
  const { id } = useParams<URLParams>();
  const classes = useStyles();

  return (
    <Container className={classes.detailsContainer}>
      <DetailsBack />
      <DetailsTable id={id} />
    </Container>
  );
};

export default Details;
