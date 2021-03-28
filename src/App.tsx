import { QueryClientProvider } from "react-query";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ToastContainer } from "react-toastify";

import { queryClient } from "common/reactQuery";
import { toastConfig } from "common/components/config";
import Router from "router/Router";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Router />
      </QueryClientProvider>
      <ToastContainer {...toastConfig} />
    </>
  );
};

export default App;
