import { DataGrid, GridPageChangeParams } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";

import { MERCHANT_PAGINATION_OPTIONS } from "common/reactQuery";
import CommonError from "common/components/CommonError";
import useMerchants from "services/useMerchants";

import columns from "./dashboardColumns";

const useStyles = makeStyles(() => ({
  container: {
    height: "28rem",
    width: "100%",
  },
}));

const DashboardTable = () => {
  const { status, data, page, size, setPage, setSize } = useMerchants();
  const c = useStyles();

  const handlePageChange = (params: GridPageChangeParams) => {
    setPage(params.page);
  };

  const handleSizeChange = (params: GridPageChangeParams) => {
    setSize(params.pageSize);
  };

  if (status === "error") return <CommonError />;

  return (
    <div className={c.container}>
      <DataGrid
        columns={columns}
        rows={data?.results || []}
        loading={status === "loading"}
        page={page}
        onPageChange={handlePageChange}
        onPageSizeChange={handleSizeChange}
        rowsPerPageOptions={MERCHANT_PAGINATION_OPTIONS}
        rowCount={data?.meta.total || 0}
        disableSelectionOnClick
        pageSize={size}
        paginationMode="server"
        pagination
      />
    </div>
  );
};

export default DashboardTable;
