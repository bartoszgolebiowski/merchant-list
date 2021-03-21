import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import DashboardCreate from "modules/dashboard/DashboardCreate";
import DashboardTable from "modules/dashboard/DashboardTable";

const useStyles = makeStyles(() => ({
  dashboardContainer: { padding: "2rem 0" },
}));

const Dashboard = () => {
  const c = useStyles();

  return (
    <Container className={c.dashboardContainer}>
      <DashboardCreate />
      <DashboardTable />
    </Container>
  );
};

export default Dashboard;
