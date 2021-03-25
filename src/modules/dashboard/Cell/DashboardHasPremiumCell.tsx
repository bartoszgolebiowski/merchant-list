import { makeStyles, Theme } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import CheckIcon from "@material-ui/icons/Check";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

type DashboardHasPremiumProps = {
  hasPremium: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  premium: { color: theme.palette.success.dark },
  noPremium: { color: theme.palette.error.dark },
}));

const DashboardHasPremium: React.FC<DashboardHasPremiumProps> = (props) => {
  const { hasPremium } = props;
  const c = useStyles();

  return hasPremium ? (
    <Tooltip title="Premium">
      <CheckIcon className={c.premium} />
    </Tooltip>
  ) : (
    <Tooltip title="No premium">
      <HighlightOffIcon className={c.noPremium} />
    </Tooltip>
  );
};

export default DashboardHasPremium;
