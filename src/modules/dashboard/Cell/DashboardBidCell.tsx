import { Link } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";

type DashboardBidCellProps = {
  merchantId: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  info: { color: theme.palette.primary.light, cursor: "pointer" },
  link: { lineHeight: 0 },
}));

const DashboardBidCell: React.FC<DashboardBidCellProps> = (props) => {
  const { merchantId } = props;
  const c = useStyles();

  return (
    <Link to={`/details/${merchantId}`} className={c.link}>
      <InfoIcon className={c.info} />
    </Link>
  );
};

export default DashboardBidCell;
