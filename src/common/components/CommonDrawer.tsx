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
  },
}));

const CommonDrawer: React.FC<CommonDrawerProps> = (props) => {
  const { anchor = "right", children, ...rest } = props;
  const classes = useStyles();

  return (
    <SwipeableDrawer anchor={anchor} {...rest}>
      <div className={classes.drawer}>{children}</div>
    </SwipeableDrawer>
  );
};

export default CommonDrawer;
