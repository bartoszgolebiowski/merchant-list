import { Link } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";

type DashboardBidCellProps = {
  merchantId: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  info: { color: theme.palette.primary.light, cursor: "pointer" },
  link: { lineHeight: 0 },
}));

const DashboardBidCell: React.FC<DashboardBidCellProps> = (props) => {
  const { merchantId } = props;
  const classes = useStyles();

  return (
    <Tooltip title="Details">
      <Link
        data-testid={`bids-${merchantId}`}
        to={`/details/${merchantId}`}
        className={classes.link}
        aria-label={`bids-${merchantId}`}
        role="button"
      >
        <InfoIcon className={classes.info} aria-label={`bids-icon-${merchantId}`} />
      </Link>
    </Tooltip>
  );
};

export default DashboardBidCell;
