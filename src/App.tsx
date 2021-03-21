import { QueryClientProvider } from "react-query";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";

import { queryClient } from "common/reactQuery";
import Router from "router/Router";

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Router />
      </QueryClientProvider>
    </SnackbarProvider>
  );
};

export default App;
