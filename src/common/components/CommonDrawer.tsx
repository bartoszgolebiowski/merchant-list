import { makeStyles, Theme } from "@material-ui/core/styles";
import SwipeableDrawer, {
  SwipeableDrawerProps,
} from "@material-ui/core/SwipeableDrawer";

interface CommonDrawerProps extends SwipeableDrawerProps {}

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: "100vw",
    [theme.breakpoints.up("md")]: {
      width: "30vw",
    },
    padding: "1rem",
    height: "100%",
  },
}));

const CommonDrawer: React.FC<CommonDrawerProps> = (props) => {
  const { anchor = "right", children, ...rest } = props;
  const c = useStyles();

  return (
    <SwipeableDrawer anchor={anchor} {...rest}>
      <div className={c.drawer}>{children}</div>
    </SwipeableDrawer>
  );
};

export default CommonDrawer;
